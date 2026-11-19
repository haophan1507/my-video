// node scripts/render-episode.mjs ep001 [--only=youtube|tiktok|thumb] [--parts=1,3] [--cut]
//   --only=...   chỉ render bản YouTube, các phần TikTok, hoặc ảnh bìa
//   --parts=1,3  chỉ render các phần TikTok này (mặc định: mọi phần)
//   --cut        phần 2 trở đi cắt thẳng từ out/youtube.mp4 bằng ffmpeg: nhanh hơn nhiều nhưng KHÔNG có thẻ hook và nhãn "Phần n/N"
//                (cần render bản YouTube trước). Mặc định mọi phần đều render bằng Clip, đủ thẻ hook và nhãn.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {epPaths, ROOT} from './lib/paths.mjs';
import {validateEpisode} from '../src/validate.ts';

const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const E = epPaths(argv[0]);
const only = flag('only');
const parts = flag('parts')?.split(',').map(Number);
const cut = argv.includes('--cut');
const fail = (msg) => { console.error(msg); process.exit(1); };

if (only && !['youtube', 'tiktok', 'thumb'].includes(only)) fail(`--only phải là youtube, tiktok hoặc thumb (nhận: ${only})`);
if (parts?.some((n) => !Number.isInteger(n))) fail(`--parts phải là danh sách số, ví dụ --parts=1,3 (nhận: ${flag('parts')})`);

const base = JSON.parse(fs.readFileSync(E.json, 'utf8'));
const errors = validateEpisode(base, {needThumb: !only || only === 'thumb'});
if (errors.length) fail(`${E.json} chưa hợp lệ:\n- ${errors.join('\n- ')}`);
if (parts?.some((n) => n < 1 || n > base.parts.length)) fail(`--parts ngoài khoảng 1–${base.parts.length}`);

const outDir = E.out;
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src', 'index.ts')});
const concurrency = Math.max(1, Math.floor(os.cpus().length / 2));

const video = async (id, inputProps, file) => {
  const composition = await selectComposition({serveUrl, id, inputProps});
  await renderMedia({
    composition, serveUrl, inputProps, codec: 'h264', concurrency,
    outputLocation: `${outDir}/${file}`,
    onProgress: ({progress}) => process.stdout.write(`\r${file} ${(progress * 100).toFixed(1)}%`),
  });
  console.log();
};

const duration = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());

// Cắt phần n từ bản YouTube. Mốc chương cùng trục thời gian với audio nên cắt thẳng được.
const cutPart = (n, file) => {
  const yt = `${outDir}/youtube.mp4`;
  if (!fs.existsSync(yt)) fail('--cut cần out/youtube.mp4: render bản YouTube trước');
  const [a, b = a] = base.parts[n - 1].chapters;
  const start = base.chapters[a - 1].startSec;
  const end = base.chapters[b]?.startSec ?? duration(yt) - 1; // bản YouTube thừa 1 giây ở cuối
  console.log(`${file}: cắt ${start}s–${end.toFixed(1)}s từ youtube.mp4 (không có thẻ hook, nhãn phần)`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(start), '-to', String(end), '-i', yt,
    '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart', `${outDir}/${file}`]);
};

if (!only || only === 'youtube') await video('Episode', {...base, part: 0}, 'youtube.mp4');
if (!only || only === 'tiktok') {
  for (let n = 1; n <= base.parts.length; n++) {
    if (parts && !parts.includes(n)) continue;
    const file = `tiktok-${String(n).padStart(2, '0')}.mp4`;
    if (cut && n > 1) cutPart(n, file);
    else await video('Clip', {...base, part: n}, file);
  }
}
if (!only || only === 'thumb') {
  const composition = await selectComposition({serveUrl, id: 'Thumbnail', inputProps: base});
  await renderStill({composition, serveUrl, inputProps: base, output: `${outDir}/thumb.png`});
}
