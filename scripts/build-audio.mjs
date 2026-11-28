// node scripts/build-audio.mjs tc005 — ghép audio chương, điền startSec, in timestamp YouTube
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';
import {epPaths, CHANNEL, chapterLabel, CHAPTER_GAP} from './lib/paths.mjs';
import {readVoiceMeta} from './lib/voice.mjs';

const E = epPaths(process.argv[2]);
const GAP = CHAPTER_GAP;
const src = E.audio, tmp = E.tmp, out = E.out;
for (const d of [tmp, out, E.pub]) fs.mkdirSync(d, {recursive: true});

const ff = (...a) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...a]);
const dur = (f) => Number(execFileSync('ffprobe',
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const ts = (s) => {
  const t = Math.floor(s), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60);
  const mm = String(m).padStart(2, '0'), ss = String(t % 60).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const files = fs.readdirSync(src).filter((f) => /^ch\d+\.(mp3|wav|m4a)$/.test(f)).sort();
ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP), `${tmp}/gap.wav`);

const epFile = E.json;
const data = JSON.parse(fs.readFileSync(epFile, 'utf8'));
// Mặc định không chào ở giây 0: câu tên kênh nằm trong ch01 sau đoạn văn án. intro: true để chèn câu chào cũ.
const INTRO = path.join(CHANNEL, 'intro.mp3');
const list = [], starts = [];
let t = 0;
if (data.intro === true && fs.existsSync(INTRO)) {
  ff('-i', INTRO, '-ar', '44100', '-ac', '1', `${tmp}/intro.wav`);
  list.push(`file '${tmp}/intro.wav'`);
  const introDur = dur(`${tmp}/intro.wav`);
  // nghỉ ngắn sau câu chào rồi vào truyện (nghỉ dài làm người xem sốt ruột)
  ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP), `${tmp}/introgap.wav`);
  list.push(`file '${tmp}/introgap.wav'`);
  t = introDur + GAP;
}
data.introSec = Math.round(t * 100) / 100;
delete data.episodeLabel; delete data.hookSec; // trường cũ, không còn dùng
data.audioSrc = `${E.pubRel}/audio.mp3`;
data.thumbBg ??= `${E.pubRel}/thumb-bg.jpg`;
// voice.tempo: tăng tốc audio chương sau khi gen (giữ cao độ). Mốc chương đo trên file đã tăng tốc nên tự khớp.
const tempo = data.voice?.tempo ?? 1;
if (!(tempo >= 0.5 && tempo <= 2)) throw new Error(`voice.tempo phải trong 0,5–2, đang là ${tempo}`);
if (tempo !== 1) {
  // mp3 gen ở tốc độ khác voice.speed (ví dụ bản 1,2 cũ) mà tăng tiếp sẽ thành quá nhanh: dừng lại
  const meta = readVoiceMeta(src);
  const wrong = files.filter((f) => meta[f]?.speed != null && meta[f].speed !== data.voice.speed);
  if (wrong.length) throw new Error(`${wrong.join(', ')} gen ở tốc độ khác voice.speed ${data.voice.speed}: chạy lại gen-voice trước khi ghép`);
}
const tempoArgs = tempo === 1 ? [] : ['-af', `atempo=${tempo}`];
files.forEach((f, i) => {
  const wav = `${tmp}/ch${i + 1}.wav`;
  ff('-i', `${src}/${f}`, ...tempoArgs, '-ar', '44100', '-ac', '1', wav);
  starts.push(Math.round(t * 100) / 100);
  list.push(`file '${wav}'`);
  t += dur(wav);
  if (i < files.length - 1) { list.push(`file '${tmp}/gap.wav'`); t += GAP; }
});
fs.writeFileSync(`${tmp}/list.txt`, list.join('\n'));
const raw = `${tmp}/audio-raw.wav`;
ff('-f', 'concat', '-safe', '0', '-i', `${tmp}/list.txt`, '-ar', '48000', '-ac', '1', raw);

// Chuẩn hóa độ to hai lượt về -14 LUFS, đỉnh -1,5 dBTP (mức YouTube dùng khi phát lại; 2026-11-27).
// Giọng TTS của tập mẫu ra khoảng -19 LUFS, nhỏ hơn video cùng thể loại nên người xem phải tăng âm lượng.
// Lượt 1 đo, lượt 2 áp theo mức đo được. linear=true chỉ có tác dụng khi tăng âm mà đỉnh vẫn dưới trần; giọng TTS cần
// tăng ~5 dB nên đỉnh vượt -1,5 dBTP và loudnorm tự chuyển sang chế độ dynamic (đo ts020 2026-11-27: -18,7 → -14,0 LUFS,
// dải động 2,1 LU gần như giữ nguyên).
const measureLoudness = (file) => {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file,
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], {encoding: 'utf8', maxBuffer: 16 << 20});
  if (r.status !== 0) throw new Error(`loudnorm đo độ to thất bại: ${r.stderr.slice(-800)}`);
  const j = JSON.parse(r.stderr.match(/\{[\s\S]*?\}/g).at(-1));
  return {i: j.input_i, tp: j.input_tp, lra: j.input_lra, thresh: j.input_thresh, offset: j.target_offset};
};
const m = measureLoudness(raw);
// Ghi ra file tạm rồi đổi tên: dừng giữa chừng (Ctrl-C, hết pin, lỗi ffmpeg) không để lại audio.mp3 cụt
// mà render vẫn dùng được. Sau khi ghi, đối chiếu độ dài với bản raw trước khi nhận.
const outAudio = `${E.pub}/audio.mp3`;
const partAudio = `${E.pub}/audio.part.mp3`;
try {
  ff('-i', raw, '-af', `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${m.i}:measured_TP=${m.tp}:measured_LRA=${m.lra}`
    + `:measured_thresh=${m.thresh}:offset=${m.offset}:linear=true`,
    '-ar', '48000', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '160k', partAudio);
  const rawDur = dur(raw), outDur = dur(partAudio);
  if (Math.abs(outDur - rawDur) > 0.5) {
    throw new Error(`audio.mp3 dài ${outDur.toFixed(2)}s, lệch bản raw ${rawDur.toFixed(2)}s: file ghi chưa xong`);
  }
  fs.renameSync(partAudio, outAudio);
} catch (e) {
  fs.rmSync(partAudio, {force: true});
  throw e;
}

data.chapters = starts.map((s, i) => ({title: data.chapters?.[i]?.title ?? chapterLabel(i + 1), startSec: s}));
fs.writeFileSync(epFile, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(`${out}/chapters.txt`, data.chapters.map((c, i) => `${ts(i === 0 ? 0 : c.startSec)} ${c.title}`).join('\n') + '\n');
console.log(`${files.length} chương, ${ts(t)}; độ to ${m.i} → -14 LUFS; timestamp: ${out}/chapters.txt`);
