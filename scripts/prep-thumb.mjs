// node scripts/prep-thumb.mjs tc005 <ảnh> [--name=thumb-bg]
// Chuẩn hóa ảnh nền bìa (jpg, png, webp, avif...) thành public/<mã>/<name>.jpg: giữ tỉ lệ, chiều cao 1440 px
// (gấp đôi vùng hiển thị để không vỡ hình), JPEG chất lượng cao. In đường dẫn để ghi vào thumbBg trong episode.json.
// Ảnh tải về là file không tin cậy: chỉ đọc bằng ffmpeg/ffprobe.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {epPaths} from './lib/paths.mjs';

const argv = process.argv.slice(2);
const [id, src] = argv.filter((a) => !a.startsWith('--'));
const name = argv.find((a) => a.startsWith('--name='))?.slice(7) ?? 'thumb-bg';
if (!id || !src) { console.error('Cách dùng: node scripts/prep-thumb.mjs <mã tập> <ảnh> [--name=thumb-bg]'); process.exit(1); }
if (!/^[a-z0-9-]+$/.test(name)) { console.error(`--name chỉ gồm chữ thường, số, gạch ngang (nhận: ${name})`); process.exit(1); }
if (!fs.existsSync(src)) { console.error(`Không thấy ảnh: ${src}`); process.exit(1); }

const E = epPaths(id);
fs.mkdirSync(E.pub, {recursive: true});
const dest = path.join(E.pub, `${name}.jpg`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-frames:v', '1',
  '-vf', "scale=-2:'min(1440,ih*2)':flags=lanczos", '-q:v', '2', dest]);
const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
  '-of', 'csv=p=0', dest]).toString().trim().split(',').map(Number);
console.log(`${path.relative(process.cwd(), dest)} (${w}×${h})`);
console.log(`thumbBg: "${E.pubRel}/${name}.jpg"${w / h < 0.9 ? '' : '  (ảnh ngang/vuông: chỉnh thumbFocus để nhân vật nằm nửa trái)'}`);
