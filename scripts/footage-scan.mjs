// node scripts/footage-scan.mjs [thư-mục=~/Downloads] [--all]
// Bước đầu của nạp footage trên MỖI MÁY: liệt kê video mới chưa nạp (so với public/footage/ingested.json), đo độ dài,
// độ phân giải, rồi tạo ảnh xem trước vào .tmp/footage-scan/ để Claude xem và phân loại:
//   <n>-sheet.jpg  lưới 5x4 khung rải đều (nội dung, chủ đề, chuyển cảnh)
//   <n>-pair.jpg   hai khung nguyên cỡ ở 1/3 và 2/3 (tìm logo, watermark, phụ đề, mép)
// Sau đó phân loại và nạp bằng split-footage.mjs (xem .claude/skills/footage-intake/SKILL.md).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT, FOOTAGE} from './lib/paths.mjs';

const argv = process.argv.slice(2);
const dir = (argv.find((a) => !a.startsWith('--')) ?? path.join(os.homedir(), 'Downloads')).replace(/^~/, os.homedir());
const all = argv.includes('--all');
if (!fs.existsSync(dir)) { console.error(`Không thấy thư mục ${dir}`); process.exit(1); }

const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const ledger = readJ(path.join(FOOTAGE, 'ingested.json'), []);
const done = new Set(ledger.map((l) => `${l.file.normalize('NFC')}|${l.size}`));
const files = fs.readdirSync(dir).filter((f) => /\.(mp4|mov|mkv|webm|m4v)$/i.test(f)).sort()
  .map((f) => ({f, size: fs.statSync(path.join(dir, f)).size}))
  .filter((x) => all || !done.has(`${x.f.normalize('NFC')}|${x.size}`));
if (!files.length) { console.log(`Không có video mới trong ${dir} (đã nạp ${ledger.length} file; --all để liệt kê cả file đã nạp).`); process.exit(0); }

const out = path.join(ROOT, '.tmp', 'footage-scan');
fs.rmSync(out, {recursive: true, force: true});
fs.mkdirSync(out, {recursive: true});
console.log(`Thư mục: ${dir}\nẢnh xem trước: ${path.relative(ROOT, out)}/\n`);
console.log('#   phút   WxH        fps  MB     file');
files.forEach(({f, size}, i) => {
  const src = path.join(dir, f), n = i + 1;
  const [w, h, fr, sec] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=width,height,r_frame_rate:format=duration', '-of', 'default=nw=1:nk=1', src]).toString().trim().split(/\s+/);
  const [a, b] = fr.split('/').map(Number), d = Number(sec);
  console.log(`${String(n).padEnd(3)} ${(d / 60).toFixed(1).padStart(5)}  ${`${w}x${h}`.padEnd(10)} ${String(Math.round(a / (b || 1))).padStart(3)}  ${String(Math.round(size / 1e6)).padStart(5)}  ${f}`);
  const q = ['-y', '-loglevel', 'error'];
  try {
    execFileSync('ffmpeg', [...q, '-i', src, '-vf', `fps=20/${d.toFixed(2)},scale=320:-2,tile=5x4`, '-frames:v', '1', '-q:v', '4', path.join(out, `${n}-sheet.jpg`)]);
    const t = (k) => ['-ss', String(Math.floor(d * k)), '-i', src];
    execFileSync('ffmpeg', [...q, ...t(1 / 3), ...t(2 / 3), '-filter_complex', '[0:v]scale=1000:-2[a];[1:v]scale=1000:-2[b];[a][b]hstack', '-frames:v', '1', '-q:v', '3', path.join(out, `${n}-pair.jpg`)]);
  } catch (e) { console.warn(`  (không tạo được ảnh xem trước cho #${n})`); }
});
