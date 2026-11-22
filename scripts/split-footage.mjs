// node scripts/split-footage.mjs <file> <tag> [--desc="mô tả tag"] [--seg=900] [--start=0] [--end=0] [--crop=x:y:w:h] [--short=720] [--crf=24] [--dry-run]
// Cắt một video dài thành nhiều đoạn liên tiếp, chuẩn hóa (30 fps, H.264, không tiếng) rồi ghi
// public/footage/<tag>/<tag>-NN.mp4 (số tiếp theo của tag) và cập nhật manifest.
//   --seg=giây    độ dài mỗi đoạn (mặc định 900); đoạn cuối ngắn hơn 300 giây thì gộp vào đoạn trước
//   --start=giây  bỏ phần đầu (intro);  --end=giây  bỏ phần cuối (outro, thẻ kênh)
//   --crop=x:y:w:h  cắt vùng sạch, tỉ lệ 0–1 so với khung gốc (ví dụ 0:0:0.8:0.8 = góc trên trái 80%, bỏ watermark góc dưới phải)
//   --short=px    cạnh ngắn tối đa của đầu ra (mặc định 720); không phóng to clip nhỏ hơn
//   --crf=số      chất lượng H.264 (mặc định 24)
//   --desc=chữ    mô tả tag (chủ đề, kiểu hình) ghi vào public/footage/tags.json; chỉ cần khi tạo tag mới hoặc đổi mô tả
// Mỗi lần chạy thật ghi thêm vào public/footage/ingested.json (sổ file nguồn đã nạp) để footage-scan.mjs bỏ qua lần sau.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT, FOOTAGE, TAG_RE} from './lib/paths.mjs';

const argv = process.argv.slice(2);
const flag = (n, d) => argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const [file, tag] = argv.filter((a) => !a.startsWith('--'));
const fail = (m) => { console.error(m); process.exit(1); };
if (!file || !tag) fail('Cách dùng: node scripts/split-footage.mjs <file> <tag> [--seg=900] [--start=0] [--end=0] [--crop=x:y:w:h] [--short=720] [--crf=24]');
if (!TAG_RE.test(tag)) fail(`Tag chỉ gồm chữ thường, số, gạch ngang (nhận: ${tag})`);
if (!fs.existsSync(file)) fail(`Không thấy file: ${file}`);

const seg = Number(flag('seg', '900')), start = Number(flag('start', '0')), end = Number(flag('end', '0'));
const short = Number(flag('short', '720')), crf = flag('crf', '24'), dry = argv.includes('--dry-run');
const cropArg = flag('crop', '');
let cropF = '';
if (cropArg) {
  const [x, y, w, h] = cropArg.split(':').map(Number);
  if ([x, y, w, h].some((v) => !(v >= 0 && v <= 1)) || w <= 0 || h <= 0 || x + w > 1.001 || y + h > 1.001) fail(`--crop sai: ${cropArg}`);
  cropF = `crop=trunc(iw*${w}/2)*2:trunc(ih*${h}/2)*2:trunc(iw*${x}/2)*2:trunc(ih*${y}/2)*2,`;
}
const vf = `${cropF}scale=w='if(gt(iw,ih),-2,min(${short},iw))':h='if(gt(iw,ih),min(${short},ih),-2)',setsar=1,fps=30`;

const total = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
const usable = total - start - end;
if (usable < 60) fail(`Còn ${usable.toFixed(0)} giây sau khi bỏ đầu/cuối`);
const n = Math.max(1, Math.floor(usable / seg));
const bounds = [];
for (let i = 0; i < n; i++) {
  const s = start + i * seg;
  const last = i === n - 1;
  bounds.push([s, last ? usable + start - s : seg]); // đoạn cuối nhận phần dư
}
if (usable - n * seg >= 300) bounds.push([start + n * seg, usable - n * seg]); // dư ≥ 5 phút thì thành đoạn riêng
if (usable - n * seg >= 300) bounds[n - 1][1] = seg;

const out = path.join(FOOTAGE, tag);
fs.mkdirSync(out, {recursive: true});
const nums = fs.readdirSync(out).map((f) => f.match(new RegExp(`^${tag}-(\\d+)\\.mp4$`))?.[1]).filter(Boolean).map(Number);
let next = Math.max(0, ...nums) + 1;

for (const [s, d] of bounds) {
  const dest = path.join(out, `${tag}-${String(next++).padStart(2, '0')}.mp4`);
  console.log(`${path.basename(file)} [${Math.round(s)}s +${Math.round(d)}s] -> ${path.relative(ROOT, dest)}`);
  if (dry) continue;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(s), '-i', file, '-t', String(d), '-vf', vf, '-an',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', crf, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
}
if (!dry) {
  const made = bounds.map((_, i) => `${tag}-${String(next - bounds.length + i).padStart(2, '0')}.mp4`);
  const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
  const ledgerF = path.join(FOOTAGE, 'ingested.json'), tagsF = path.join(FOOTAGE, 'tags.json');
  const ledger = readJ(ledgerF, []);
  ledger.push({file: path.basename(file), size: fs.statSync(file).size, tag, clips: made, crop: cropArg || null, start, end, date: new Date().toISOString().slice(0, 10)});
  fs.writeFileSync(ledgerF, JSON.stringify(ledger, null, 2) + '\n');
  const tags = readJ(tagsF, {});
  const desc = flag('desc', '');
  if (desc || !tags[tag]) tags[tag] = {...tags[tag], desc: desc || tags[tag]?.desc || ''};
  fs.writeFileSync(tagsF, JSON.stringify(tags, null, 2) + '\n');
}
if (!dry) execFileSync('node', [path.join(ROOT, 'scripts', 'footage-manifest.mjs')], {stdio: 'inherit', cwd: ROOT});
