// node scripts/footage-pick.mjs [<mã tập> [<tag>]]
// Footage khác nhau theo máy, nên tag của tập được chọn theo kho CỦA MÁY NÀY.
//   không tham số : bảng tag đang có (số clip, phút, mô tả từ public/footage/tags.json)
//   <mã tập>      : bảng tag + tag đang dùng cho tập (choices.json > footageTag trong episode.json)
//   <mã tập> <tag>: ghi lựa chọn vào public/footage/choices.json (cục bộ, không vào git, thắng footageTag)
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, FOOTAGE} from './lib/paths.mjs';

const [code, tag] = process.argv.slice(2);
const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const manifest = readJ(path.join(FOOTAGE, 'manifest.json'), []);
const tags = readJ(path.join(FOOTAGE, 'tags.json'), {});
const choicesF = path.join(FOOTAGE, 'choices.json');
const choices = readJ(choicesF, {});
const names = [...new Set(manifest.map((m) => m.tag))].sort();

if (code && tag) {
  if (!names.includes(tag)) { console.error(`Tag "${tag}" chưa có trên máy này. Có: ${names.join(', ') || '(trống)'}`); process.exit(1); }
  choices[code] = tag;
  fs.writeFileSync(choicesF, JSON.stringify(choices, null, 2) + '\n');
  console.log(`${code} -> ${tag} (public/footage/choices.json)`);
  process.exit(0);
}
console.log('tag          clip  phút  hướng  mô tả');
for (const t of names) {
  const c = manifest.filter((m) => m.tag === t);
  const v = c.filter((m) => m.width / m.height < 0.8).length;
  const speed = tags[t]?.speed ?? 1, start = tags[t]?.start ?? 0;
  const first = [...c].sort((a, b) => a.src.localeCompare(b.src))[0]?.src;
  const usable = c.reduce((s, m) => s + Math.max(0, m.sec - (m.src === first ? start : 0)) / speed, 0);
  console.log(`${t.padEnd(12)} ${String(c.length).padStart(4)}  ${String(Math.round(usable / 60)).padStart(4)}  ${(v === c.length ? 'dọc' : v ? 'lẫn' : 'ngang').padEnd(5)}  ${tags[t]?.desc ?? ''}`);
}
console.log('phút = thời lượng sau speed (đã trừ start của clip 01); tag nên dài ≥ độ dài tập.');
if (code) {
  let ep = null;
  const root = path.join(ROOT, 'episodes');
  for (const g of fs.existsSync(root) ? fs.readdirSync(root) : []) {
    const gd = path.join(root, g);
    if (!fs.statSync(gd).isDirectory()) continue;
    const e = fs.readdirSync(gd).find((n) => n.startsWith(code + '-'));
    if (e) ep = readJ(path.join(gd, e, 'episode.json'), null);
  }
  console.log(`\n${code}: tag đang dùng = ${choices[code] ?? ep?.footageTag ?? '(chưa chọn)'}${ep?.footageTag && !names.includes(choices[code] ?? ep.footageTag) ? '  <- CHƯA CÓ trên máy này, chọn tag khác' : ''}`);
}
