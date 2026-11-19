// node scripts/prep-footage.mjs <thư mục clip gốc> <tag> [giây tối đa mỗi clip, mặc định 900]
// Chuẩn hóa mọi clip .mp4 .mov .mkv .webm .m4v về 1080x1920, 30 fps, H.264, bỏ tiếng; ghi public/footage/<tag>-NN.mp4 rồi cập nhật manifest.
// Dùng được trên macOS và Windows (cần ffmpeg trong PATH).
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT} from './lib/paths.mjs';

const [src, tag, maxSec = '900'] = process.argv.slice(2);
if (!src || !tag) { console.error('Cách dùng: node scripts/prep-footage.mjs <thư mục clip> <tag> [giây tối đa]'); process.exit(1); }

const out = path.join(ROOT, 'public', 'footage');
fs.mkdirSync(out, {recursive: true});
const existing = fs.readdirSync(out).filter((f) => f.startsWith(`${tag}-`) && f.endsWith('.mp4')).length;
const files = fs.readdirSync(src).filter((f) => /\.(mp4|mov|mkv|webm|m4v)$/i.test(f)).sort();
files.forEach((f, i) => {
  const dest = path.join(out, `${tag}-${String(existing + i + 1).padStart(2, '0')}.mp4`);
  console.log(`${f} -> ${path.basename(dest)}`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(src, f), '-t', maxSec,
    '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30',
    '-an', '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
});
execFileSync('node', [path.join(ROOT, 'scripts', 'footage-manifest.mjs')], {stdio: 'inherit', cwd: ROOT});
