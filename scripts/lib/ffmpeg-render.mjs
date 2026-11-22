// Đường render nhanh: ffmpeg ghép footage + lớp tối + lớp phủ PNG (logo, nhãn) + audio, không qua Chrome.
// Cho cùng kết quả với composition Episode/Clip khi phụ đề tắt (src/Story.tsx, src/FootageTrack.tsx):
// footage phát liền từng clip theo thứ tự tên file, mờ chéo 1 giây, quay lại clip đầu khi hết tag;
// phủ kín nếu phần cắt ≤ 20% diện tích, ngược lại viền đen. Sửa FootageTrack thì sửa cả file này.
import fs from 'node:fs';
import path from 'node:path';
import {spawn, spawnSync} from 'node:child_process';
import {ROOT, FOOTAGE} from './paths.mjs';

export const FPS = 30;
const FADE_SEC = 1;
const MAX_CROP = 0.2;

const probeSec = (file) => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {encoding: 'utf8'});
  const sec = Number(r.stdout.trim());
  if (r.status !== 0 || !sec) throw new Error(`ffprobe không đọc được độ dài ${file}: ${r.stderr}`);
  return sec;
};

// Giống loadEpisode trong src/Root.tsx: audioSec, footage theo tag (choices.json thắng footageTag)
export function loadFootage(props) {
  const manifest = JSON.parse(fs.readFileSync(path.join(FOOTAGE, 'manifest.json'), 'utf8'));
  const choicesFile = path.join(FOOTAGE, 'choices.json');
  const choices = fs.existsSync(choicesFile) ? JSON.parse(fs.readFileSync(choicesFile, 'utf8')) : {};
  const tag = choices[props.audioSrc.split('/')[0]] ?? props.footageTag;
  const tagsFile = path.join(FOOTAGE, 'tags.json');
  const tagInfo = (fs.existsSync(tagsFile) ? JSON.parse(fs.readFileSync(tagsFile, 'utf8'))[tag] : undefined) ?? {};
  const speed = tagInfo.speed ?? 1, start = tagInfo.start ?? 0;
  const footage = manifest.filter((f) => f.tag === tag).map((f) => ({...f, speed, start}));
  if (!footage.length) throw new Error(`Không có footage cho tag "${tag}" trên máy này. Chạy node scripts/footage-pick.mjs <mã tập> <tag>`);
  return {tag, speed, start, footage, audioSec: probeSec(path.join(ROOT, 'public', props.audioSrc))};
}

// Kế hoạch footage cả tập theo khung hình, y như FootageTrack
const fullPlan = (footage, totalFrames, frameRatio) => {
  const fade = Math.round(FADE_SEC * FPS);
  const clips = [...footage].sort((a, b) => a.src.localeCompare(b.src));
  const out = [];
  let at = 0;
  for (let i = 0; at < totalFrames; i++) {
    const c = clips[i % clips.length];
    const skip = i % clips.length === 0 ? (c.start ?? 0) : 0; // tags.json start: bỏ đoạn đầu clip 01 (intro, chữ kênh gốc)
    const len = Math.max(fade * 2 + 1, Math.floor(((c.sec - skip) / (c.speed ?? 1)) * FPS)); // speed > 1: clip hết nhanh hơn
    const from = i === 0 ? 0 : at - fade;
    const r = c.width && c.height ? c.width / c.height : frameRatio;
    const fit = 1 - Math.min(r, frameRatio) / Math.max(r, frameRatio) <= MAX_CROP ? 'cover' : 'contain';
    out.push({src: c.src, from, dur: len, fit, speed: c.speed ?? 1, skip});
    at = from + len;
  }
  return out;
};

// Cắt kế hoạch theo cửa sổ [f0, f1) khung (bản TikTok bắt đầu giữa tập). Bỏ đoạn chỉ còn dính phần mờ chéo
// ở hai mép cửa sổ để xfade luôn đủ 1 giây.
const windowPlan = (plan, f0, f1) => {
  const fade = Math.round(FADE_SEC * FPS);
  const segs = [];
  for (const s of plan) {
    const end = s.from + s.dur;
    if (end <= f0 || s.from >= f1) continue;
    if (segs.length === 0 && end <= f0 + fade && plan.some((t) => t.from > s.from && t.from <= f0 + fade)) continue;
    if (segs.length > 0 && s.from > f1 - fade) continue;
    const a = Math.max(s.from, f0);
    segs.push({...s, seek: (a - s.from) / FPS, at: (a - f0) / FPS, len: (Math.min(end, f1) - a) / FPS});
  }
  return segs;
};

// Bộ mã hóa: Mac VideoToolbox; Windows/Linux dò NVENC, QSV, AMF bằng một lần mã hóa thử; không có thì libx264.
const tryEncoder = (name) => spawnSync('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'color=s=256x256:d=0.2',
  '-c:v', name, '-f', 'null', '-'], {encoding: 'utf8'}).status === 0;
let cachedEncoder;
export function pickEncoder(mode) {
  if (mode === 'sw') return {name: 'libx264', args: ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18']};
  if (cachedEncoder) return cachedEncoder;
  const hw = process.platform === 'darwin' ? ['h264_videotoolbox'] : ['h264_nvenc', 'h264_qsv', 'h264_amf'];
  const name = hw.find(tryEncoder);
  cachedEncoder = name
    ? {name, args: ['-c:v', name, '-b:v', '5M', '-maxrate', '8M', '-bufsize', '10M']}
    : pickEncoder('sw');
  return cachedEncoder;
}

// Đọc chuỗi bộ lọc từ file: ffmpeg ≥ 7 dùng "-/filter_complex <file>", bản cũ dùng -filter_complex_script (ffmpeg 8 đã bỏ)
let newSyntax;
const filterFileArgs = (file) => {
  newSyntax ??= !spawnSync('ffmpeg', ['-hide_banner', '-h', 'full'], {encoding: 'utf8', maxBuffer: 64 << 20}).stdout.includes('filter_complex_script');
  return newSyntax ? ['-/filter_complex', file] : ['-filter_complex_script', file];
};

const fitFilter = (fit, W, H) => fit === 'cover'
  ? `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`
  : `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black`;

// props: episode đã có audioSec, footage; part 0 = YouTube 1920×1080, part n = TikTok 1080×1920.
// overlayPng: ảnh trong suốt cùng khung (logo, nhãn). tmpDir: nơi ghi script bộ lọc.
export async function renderFfmpeg({props, startSec, endSec, overlayPng, output, encoder, tmpDir, onProgress}) {
  const portrait = props.part > 0;
  const [W, H] = portrait ? [1080, 1920] : [1920, 1080];
  const tail = props.part ? 0 : FPS;
  const outFrames = Math.ceil((endSec - startSec) * FPS) + tail; // = durationInFrames của composition
  const storyFrames = Math.ceil(props.audioSec * FPS) + FPS;     // = totalFrames của Story
  const f0 = Math.round(startSec * FPS);
  const segs = windowPlan(fullPlan(props.footage, storyFrames, W / H), f0, f0 + outFrames);
  const outSec = outFrames / FPS;

  const args = ['-v', 'error', '-stats_period', '1', '-progress', 'pipe:1', '-y'];
  // seek, len tính theo thời gian ra; nhân speed để ra thời gian trong clip nguồn
  for (const s of segs) args.push('-ss', (s.skip + s.seek * s.speed).toFixed(3), '-t', (s.len * s.speed).toFixed(3), '-i', path.join(ROOT, 'public', s.src));
  args.push('-loop', '1', '-i', overlayPng);
  args.push('-ss', startSec.toFixed(3), '-i', path.join(ROOT, 'public', props.audioSrc));
  const ov = segs.length, au = segs.length + 1;

  const f = segs.map((s, i) => `[${i}:v]setpts=(PTS-STARTPTS)/${s.speed},fps=${FPS},${fitFilter(s.fit, W, H)},setsar=1,format=yuv420p,settb=AVTB[s${i}]`);
  let last = 's0';
  for (let i = 1; i < segs.length; i++) {
    f.push(`[${last}][s${i}]xfade=transition=fade:duration=${FADE_SEC}:offset=${segs[i].at.toFixed(3)}[x${i}]`);
    last = `x${i}`;
  }
  // Lớp đen độ mờ dim = nhân RGB với k = 1 - dim; trong YUV là co Y về 16 và U, V về 128 cùng hệ số.
  // (drawbox có alpha làm mất màu gần hết, không dùng.)
  const k = (1 - props.dim).toFixed(4);
  const dim = props.dim > 0 ? `,lutyuv=y=16+(val-16)*${k}:u=128+(val-128)*${k}:v=128+(val-128)*${k}` : '';
  f.push(`[${last}]trim=duration=${outSec.toFixed(3)}${dim}[bg]`);
  f.push(`[bg][${ov}:v]overlay=0:0:shortest=1:format=auto,format=yuv420p[v]`);
  f.push(`[${au}:a]atrim=duration=${(endSec - startSec).toFixed(3)},apad=whole_dur=${outSec.toFixed(3)}[a]`);
  fs.mkdirSync(tmpDir, {recursive: true});
  const script = path.join(tmpDir, `${path.basename(output)}.filter.txt`); // tránh giới hạn độ dài dòng lệnh Windows
  fs.writeFileSync(script, f.join(';\n'));

  args.push(...filterFileArgs(script), '-map', '[v]', '-map', '[a]', '-t', outSec.toFixed(3), '-r', String(FPS),
    ...encoder.args, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', output);

  await new Promise((resolve, reject) => {
    const p = spawn('ffmpeg', args, {stdio: ['ignore', 'pipe', 'pipe']});
    let err = '';
    p.stderr.on('data', (d) => { err += d; });
    p.stdout.on('data', (d) => {
      const m = String(d).match(/out_time_us=(\d+)/g)?.pop();
      if (m) onProgress?.(Math.min(1, Number(m.split('=')[1]) / 1e6 / outSec));
    });
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg lỗi (mã ${code}):\n${err.slice(-2000)}`))));
  });
}
