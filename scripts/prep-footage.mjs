// node scripts/prep-footage.mjs <thư mục clip gốc> <tag> [--max=900] [--start=0] [--crop=top|square]
// Chuẩn hóa mọi clip .mp4 .mov .mkv .webm .m4v trong thư mục: giữ tỉ lệ khung gốc, cạnh ngắn 1080 px, 30 fps,
// H.264, bỏ tiếng. Ghi public/footage/<tag>/<tag>-NN.mp4 rồi cập nhật manifest.
// Không ép về 9:16 hay 16:9: Remotion tự khớp clip vào từng khung (src/FootageTrack.tsx), lệch tỉ lệ nhiều thì thêm viền đen.
//   --max=giây    độ dài tối đa mỗi clip (mặc định 900)
//   --start=giây  bỏ phần đầu (intro, logo); mọi clip trong thư mục dùng chung mốc này
//   --crop=top    giữ 72% phía trên khung (bỏ watermark, chữ ở đáy)
//   --crop=square ô vuông giữa khung, bỏ 20% dải dưới (bỏ logo, chữ hai bên và ở đáy)
// Chạy được trên macOS và Windows (cần ffmpeg, ffprobe trong PATH).
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT, FOOTAGE, TAG_RE} from './lib/paths.mjs';

const argv = process.argv.slice(2);
const flag = (name, def) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? def;
const [src, tag] = argv.filter((a) => !a.startsWith('--'));
const maxSec = flag('max', '900'), startSec = flag('start', '0'), crop = flag('crop', '');
const fail = (m) => { console.error(m); process.exit(1); };

if (!src || !tag) fail('Cách dùng: node scripts/prep-footage.mjs <thư mục clip> <tag> [--max=900] [--start=0] [--crop=top|square]');
if (!TAG_RE.test(tag)) fail(`Tag chỉ gồm chữ thường, số, gạch ngang (nhận: ${tag})`);
if (crop && !['top', 'square'].includes(crop)) fail(`--crop phải là top hoặc square (nhận: ${crop})`);

const CROP = {
  top: 'crop=iw:trunc(ih*0.72/2)*2:0:0,',
  square: "crop='trunc(ih*0.8/2)*2':'trunc(ih*0.8/2)*2':'(iw-ih*0.8)/2':0,",
};
// Cạnh ngắn 1080: clip dọc 1080×1920, ngang 1920×1080, vuông 1080×1080
const vf = `${CROP[crop] ?? ''}scale='if(gt(iw,ih),-2,1080)':'if(gt(iw,ih),1080,-2)',setsar=1,fps=30`;

const out = path.join(FOOTAGE, tag);
fs.mkdirSync(out, {recursive: true});
const nums = fs.readdirSync(out).map((f) => f.match(new RegExp(`^${tag}-(\\d+)\\.mp4$`))?.[1]).filter(Boolean).map(Number);
let next = Math.max(0, ...nums) + 1;
const files = fs.readdirSync(src).filter((f) => /\.(mp4|mov|mkv|webm|m4v)$/i.test(f)).sort();
if (!files.length) fail(`Không có clip video trong ${src}`);

for (const f of files) {
  const dest = path.join(out, `${tag}-${String(next++).padStart(2, '0')}.mp4`);
  console.log(`${f} -> ${path.relative(ROOT, dest)}`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', startSec, '-i', path.join(src, f), '-t', maxSec,
    '-vf', vf, '-an', '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
}
execFileSync('node', [path.join(ROOT, 'scripts', 'footage-manifest.mjs')], {stdio: 'inherit', cwd: ROOT});
