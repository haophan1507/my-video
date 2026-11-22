// node scripts/footage-preview.mjs <tag> [--speeds=1,1.25,1.5,2] [--start=5] [--sec=25]
// Xem trước nhịp footage: lưới 2×2 cùng một đoạn đầu clip đầu tiên của tag ở nhiều tốc độ
// (trái trên → phải trên → trái dưới → phải dưới theo thứ tự --speeds), kèm một ảnh lưới khung hình rải đều tag
// để soát độ crop (thấy rõ tay và vật chính). Ra .tmp/preview/<tag>-toc-do.mp4 và <tag>-khung.png.
// Chốt tốc độ thì ghi "speed" của tag trong public/footage/tags.json (xem references/edit-yeu-cau.md, mục Footage).
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT, FOOTAGE} from './lib/paths.mjs';

const argv = process.argv.slice(2);
const flag = (n, d) => argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const tag = argv.find((a) => !a.startsWith('--'));
if (!tag) { console.error('Cần tên tag, ví dụ: node scripts/footage-preview.mjs craft'); process.exit(1); }
const dir = path.join(FOOTAGE, tag);
const clips = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.mp4')).sort() : [];
if (!clips.length) { console.error(`Không có clip trong public/footage/${tag}/`); process.exit(1); }
const speeds = flag('speeds', '1,1.25,1.5,2').split(',').map(Number).slice(0, 4);
const start = Number(flag('start', 5)), sec = Number(flag('sec', 25));
const out = path.join(ROOT, '.tmp', 'preview');
fs.mkdirSync(out, {recursive: true});
const ff = (args) => {
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], {encoding: 'utf8'});
  if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
};

// 1. Lưới tốc độ
const src = path.join(dir, clips[0]);
const n = speeds.length;
const cells = speeds.map((s, i) => `[v${i}]setpts=(PTS-STARTPTS)/${s},trim=duration=${sec},setpts=PTS-STARTPTS[c${i}]`);
while (cells.length < 4) cells.push(`color=black:s=640x360:d=${sec}[c${cells.length}]`);
const graph = [`[0:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1,split=${n}${speeds.map((_, i) => `[v${i}]`).join('')}`,
  ...cells, '[c0][c1]hstack[t]', '[c2][c3]hstack[u]', '[t][u]vstack,fps=30,format=yuv420p[v]'].join(';');
const speedFile = path.join(out, `${tag}-toc-do.mp4`);
ff(['-ss', String(start), '-t', String(sec * Math.max(...speeds) + 1), '-i', src, '-filter_complex', graph, '-map', '[v]', '-t', String(sec),
  '-c:v', process.platform === 'darwin' ? 'h264_videotoolbox' : 'libx264', '-b:v', '6M', speedFile]);

// 2. Lưới khung hình: 3 khung mỗi clip (25%, 50%, 75%), tối đa 4 clip, 3 cột
const probe = (f) => Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], {encoding: 'utf8'}).stdout);
const shots = clips.slice(0, 4).flatMap((c) => { const d = probe(path.join(dir, c)); return [0.25, 0.5, 0.75].map((p) => [path.join(dir, c), d * p]); });
const inputs = shots.flatMap(([f, t]) => ['-ss', t.toFixed(1), '-i', f]);
const tiles = shots.map((_, i) => `[${i}:v]trim=end_frame=1,scale=480:270:force_original_aspect_ratio=decrease,pad=480:270:(ow-iw)/2:(oh-ih)/2,setsar=1[k${i}]`);
const rows = [];
for (let r = 0; r * 3 < shots.length; r++) {
  tiles.push(`[k${r * 3}][k${r * 3 + 1}][k${r * 3 + 2}]hstack=3[r${r}]`);
  rows.push(`[r${r}]`);
}
tiles.push(rows.length > 1 ? `${rows.join('')}vstack=${rows.length},format=rgb24[out]` : `[r0]format=rgb24[out]`);
const sheetFile = path.join(out, `${tag}-khung.png`);
ff([...inputs, '-filter_complex', tiles.join(';'), '-map', '[out]', '-frames:v', '1', '-update', '1', sheetFile]);

const tags = fs.existsSync(path.join(FOOTAGE, 'tags.json')) ? JSON.parse(fs.readFileSync(path.join(FOOTAGE, 'tags.json'), 'utf8')) : {};
console.log(`${tag}: tốc độ hiện tại ${tags[tag]?.speed ?? 1}`);
console.log(`  ${path.relative(ROOT, speedFile)}  (lưới tốc độ ${speeds.join(' | ')}, ${sec} giây)`);
console.log(`  ${path.relative(ROOT, sheetFile)}  (khung hình rải đều, soát crop)`);
