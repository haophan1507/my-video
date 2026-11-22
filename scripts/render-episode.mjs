// node scripts/render-episode.mjs tc005 [--only=youtube|tiktok|clips|cover|thumb] [--parts=1,3] [--engine=ffmpeg|remotion] [--encoder=hw|sw] [--concurrency=2]
//   youtube.mp4    khung ngang 1920×1080 (composition Episode): câu chào bằng giọng, watermark logo
//   tiktok-NN.mp4  khung dọc 1080×1920 (composition Clip), mỗi phần render riêng, watermark + nhãn "Phần n/N"
//   tiktok-NN-cover.png  bìa phần TikTok 1080×1920 (render cùng phần, hoặc riêng bằng --only=cover)
//   thumb.png      ảnh bìa YouTube 1280×720
//   --only=...     chỉ render bản YouTube, các phần TikTok (kèm bìa), chỉ bìa TikTok, hoặc ảnh bìa YouTube; clips = các phần TikTok không kèm bìa (chưa có ảnh nhân vật)
//   --parts=1,3    chỉ render các phần TikTok này (mặc định: mọi phần)
//   --out=dir      ghi ra thư mục khác thay vì out/ của tập (render thử)
//   --engine=ffmpeg  (mặc định) ffmpeg ghép footage + lớp phủ PNG do Remotion vẽ + audio, ~6 lần nhanh hơn (scripts/lib/ffmpeg-render.mjs)
//   --engine=remotion  Chrome vẽ từng khung; tự dùng khi tập bật phụ đề (captionsSrc) vì ffmpeg chưa vẽ phụ đề
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {epPaths, ROOT} from './lib/paths.mjs';
import {validateEpisode} from '../src/validate.ts';
import {partRange} from '../src/types.ts';
import {loadFootage, pickEncoder, renderFfmpeg} from './lib/ffmpeg-render.mjs';

const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const E = epPaths(argv[0]);
const only = flag('only');
const parts = flag('parts')?.split(',').map(Number);
const fail = (msg) => { console.error(msg); process.exit(1); };

if (argv.includes('--cut')) fail('--cut đã bỏ: bản YouTube là khung ngang nên không cắt ra phần TikTok dọc được. Dùng --parts=1,3 để render bớt.');
if (only && !['youtube', 'tiktok', 'clips', 'cover', 'thumb'].includes(only)) fail(`--only phải là youtube, tiktok, clips, cover hoặc thumb (nhận: ${only})`);
if (parts?.some((n) => !Number.isInteger(n))) fail(`--parts phải là danh sách số, ví dụ --parts=1,3 (nhận: ${flag('parts')})`);

const base = JSON.parse(fs.readFileSync(E.json, 'utf8'));
// Bìa không cần mốc chương: render thumb khi chưa có audio thì bỏ lỗi startSec.
const errors = validateEpisode(base, {needThumb: !only || ['thumb', 'tiktok', 'cover'].includes(only)})
  .filter((e) => !(only === 'thumb' && /startSec|audioSrc/.test(e)));
if (errors.length) fail(`${E.json} chưa hợp lệ:\n- ${errors.join('\n- ')}`);
if (parts?.some((n) => n < 1 || n > base.parts.length)) fail(`--parts ngoài khoảng 1–${base.parts.length}`);

// --out=thư-mục: ghi ra chỗ khác (render thử, không đè bản trong out/)
const outDir = flag('out') ? path.resolve(flag('out')) : E.out;
fs.mkdirSync(outDir, {recursive: true});

// Bundle trỏ link tới public/ (symlinkPublicDir) thay vì chép cả kho footage (5,6 GB mỗi lần chạy, 2026-11-22).
// Ghi vào thư mục tạm mang pid để dọn được bundle của lượt chạy cũ bị treo, crash hoặc kill -9 (exit handler không chạy).
const tmp = os.tmpdir();
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
for (const d of fs.readdirSync(tmp)) {
  const m = d.match(/^my-video-bundle-(\d+)$/);
  if (m && !alive(Number(m[1]))) fs.rmSync(path.join(tmp, d), {recursive: true, force: true});
}
const bundleDir = path.join(tmp, `my-video-bundle-${process.pid}`);
const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src', 'index.ts'), symlinkPublicDir: true, outDir: bundleDir});
const cleanup = () => { try { fs.rmSync(bundleDir, {recursive: true, force: true}); } catch {} };
process.on('exit', cleanup);
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130));
// --concurrency: số tab Chrome render song song; mặc định nửa số nhân.
const concurrency = Number(flag('concurrency')) || Math.max(1, Math.floor(os.cpus().length / 2));
// Bộ nhớ đệm khung hình của @remotion/media mặc định = 50% RAM cho MỖI tab: 4–6 tab là tràn RAM, máy treo
// (đo 2026-11-22). Chia 40% RAM cho các tab, mỗi tab 240 MB–2 GB.
const mediaCacheSizeInBytes = Math.round(Math.min(2048, Math.max(240, os.totalmem() * 0.4 / concurrency / 2 ** 20))) * 2 ** 20;
// --encoder=hw: mã hóa H.264 bằng chip phần cứng, CPU dành cho Chrome; cần bitrate cố định. Mac: VideoToolbox (mặc định).
// Windows/Linux: Remotion chỉ có NVENC, chọn theo hệ điều hành chứ không dò card, máy không có card NVIDIA sẽ lỗi,
// nên ở đó mặc định sw; chỉ ghi --encoder=hw khi máy có card NVIDIA. --encoder=sw: libx264 crf 18.
const encoder = flag('encoder') ?? (process.platform === 'darwin' ? 'hw' : 'sw');
if (!['hw', 'sw'].includes(encoder)) fail(`--encoder phải là hw hoặc sw (nhận: ${encoder})`);
const encoding = encoder === 'hw' ? {hardwareAcceleration: 'if-possible', videoBitrate: '5M'} : {crf: 18};
let engine = flag('engine') ?? 'ffmpeg';
if (!['ffmpeg', 'remotion'].includes(engine)) fail(`--engine phải là ffmpeg hoặc remotion (nhận: ${engine})`);
if (engine === 'ffmpeg' && base.captionsSrc) {
  console.log('Tập bật phụ đề (captionsSrc): đường ffmpeg chưa vẽ phụ đề, chuyển sang --engine=remotion.');
  engine = 'remotion';
}
const needsVideo = only !== 'thumb' && only !== 'cover';
const loaded = engine === 'ffmpeg' && needsVideo ? loadFootage(base) : null;
const ffEncoder = loaded ? pickEncoder(encoder) : null;
if (ffEncoder) console.log(`ffmpeg, tag footage "${loaded.tag}" tốc độ ${loaded.speed}, bỏ ${loaded.start} giây đầu, mã hóa ${ffEncoder.name}`);

const ffmpegVideo = async (inputProps, file) => {
  const props = {...inputProps, ...loaded, captions: []};
  const {startSec, endSec} = partRange(props);
  const overlayPng = path.join(bundleDir, `overlay-${props.part}.png`);
  const id = props.part ? 'OverlayTiktok' : 'OverlayYoutube';
  const overlayProps = {part: props.part, total: props.parts.length};
  const composition = await selectComposition({serveUrl, id, inputProps: overlayProps});
  await renderStill({composition, serveUrl, inputProps: overlayProps, output: overlayPng, imageFormat: 'png'});
  const t0 = Date.now();
  await renderFfmpeg({props, startSec, endSec, overlayPng, output: `${outDir}/${file}`, encoder: ffEncoder, tmpDir: bundleDir,
    onProgress: (p) => process.stdout.write(`\r${file} ${(p * 100).toFixed(1)}%`)});
  console.log(` (${((Date.now() - t0) / 60000).toFixed(1)} phút)`);
};

const video = async (id, inputProps, file) => {
  if (engine === 'ffmpeg') return ffmpegVideo(inputProps, file);
  const composition = await selectComposition({serveUrl, id, inputProps});
  await renderMedia({
    composition, serveUrl, inputProps, codec: 'h264', concurrency, mediaCacheSizeInBytes, ...encoding,
    outputLocation: `${outDir}/${file}`,
    onProgress: ({progress}) => process.stdout.write(`\r${file} ${(progress * 100).toFixed(1)}%`),
  });
  console.log();
};


if (!only || only === 'youtube') await video('Episode', {...base, part: 0}, 'youtube.mp4');
if (!only || only === 'tiktok' || only === 'clips' || only === 'cover') {
  for (let n = 1; n <= base.parts.length; n++) {
    if (parts && !parts.includes(n)) continue;
    const nn = String(n).padStart(2, '0');
    const props = {...base, part: n};
    if (only !== 'cover') await video('Clip', props, `tiktok-${nn}.mp4`);
    if (only === 'clips') continue;
    const composition = await selectComposition({serveUrl, id: 'TikTokCover', inputProps: props});
    await renderStill({composition, serveUrl, inputProps: props, output: `${outDir}/tiktok-${nn}-cover.png`});
    console.log(`tiktok-${nn}-cover.png`);
  }
}
if (!only || only === 'thumb') {
  // thumb.png từ thumbText/thumbBg; thumb-2.png, thumb-3.png... từ thumbAlt[] (mỗi mục ghi đè vài trường) để A/B test
  const variants = [base, ...(base.thumbAlt ?? []).map((v) => ({...base, ...v}))];
  for (const [i, props] of variants.entries()) {
    const file = i === 0 ? 'thumb.png' : `thumb-${i + 1}.png`;
    const composition = await selectComposition({serveUrl, id: 'Thumbnail', inputProps: props});
    await renderStill({composition, serveUrl, inputProps: props, output: `${outDir}/${file}`});
    console.log(file);
  }
}
