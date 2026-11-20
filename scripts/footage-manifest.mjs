// node scripts/footage-manifest.mjs — quét public/footage/<tag>/*.mp4, ghi public/footage/manifest.json và in bảng tổng hợp theo tag.
// Mỗi mục: {tag, src, sec, width, height}. Chạy lại sau khi thêm, xóa hoặc đổi tên clip.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {FOOTAGE} from './lib/paths.mjs';

const probe = (f) => {
  const [w, h, sec] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height:format=duration', '-of', 'default=nw=1:nk=1', f]).toString().trim().split(/\s+/);
  return {width: Number(w), height: Number(h), sec: Number(sec)};
};
const shape = ({width, height}) => (width / height < 0.8 ? 'dọc' : width / height > 1.25 ? 'ngang' : 'vuông');

fs.mkdirSync(FOOTAGE, {recursive: true});
const stray = fs.readdirSync(FOOTAGE).filter((f) => f.endsWith('.mp4'));
if (stray.length) console.warn(`Bỏ qua ${stray.length} clip nằm thẳng trong public/footage/ (cần chuyển vào thư mục tag): ${stray.join(', ')}`);

const tags = fs.readdirSync(FOOTAGE, {withFileTypes: true}).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const items = tags.flatMap((tag) => fs.readdirSync(path.join(FOOTAGE, tag)).filter((f) => f.endsWith('.mp4')).sort()
  .map((f) => ({tag, src: `footage/${tag}/${f}`, ...probe(path.join(FOOTAGE, tag, f))})));
fs.writeFileSync(path.join(FOOTAGE, 'manifest.json'), JSON.stringify(items, null, 2) + '\n');

const min = (s) => (s / 60).toFixed(1).replace('.', ',');
console.log('tag        clip  phút   dọc/ngang/vuông');
for (const tag of tags) {
  const c = items.filter((i) => i.tag === tag);
  const n = (k) => c.filter((i) => shape(i) === k).length;
  console.log(`${tag.padEnd(10)} ${String(c.length).padStart(4)}  ${min(c.reduce((s, i) => s + i.sec, 0)).padStart(5)}  ${n('dọc')}/${n('ngang')}/${n('vuông')}`);
}
console.log(`Tổng ${items.length} clip -> public/footage/manifest.json`);
