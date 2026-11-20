#!/usr/bin/env node
// Tên nhân vật đã dùng ở mọi tập (đọc bảng tên trong outline.md), để tập mới không đặt trùng.
// Dùng: node scripts/names.mjs            in bảng họ tên theo tập và các họ đã dùng nhiều
//       node scripts/names.mjs --surnames  chỉ in danh sách họ đã dùng (một dòng)
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, GENRES} from './lib/paths.mjs';

const rows = [];
for (const g of Object.values(GENRES)) {
  const base = path.join(ROOT, 'episodes', g.dir);
  if (!fs.existsSync(base)) continue;
  for (const ep of fs.readdirSync(base).sort()) {
    const f = path.join(base, ep, 'outline.md');
    if (!fs.existsSync(f)) continue;
    const md = fs.readFileSync(f, 'utf8');
    const table = md.split(/^## /m).find((s) => /^Bảng tên/.test(s)) ?? '';
    for (const line of table.split('\n').filter((l) => /^\|/.test(l)).slice(2)) {
      const [role, full] = line.split('|').slice(1).map((c) => c.trim());
      // Họ tên = phần trước dấu phẩy đầu tiên; bỏ dòng không đặt tên riêng
      const name = full?.split(/[,(]/)[0].replace(/\*|"/g, '').trim().replace(/^(chú|cô|bà|ông|lão|bác|dì|anh|chị)\s+/i, '');
      if (!name || /không (đặt )?tên/i.test(full)) continue;
      rows.push({ep: ep.match(/^[a-z]{2}\d+/)[0], role, name, surname: name.split(/\s+/)[0]});
    }
  }
}

const count = new Map();
for (const r of rows) count.set(r.surname, (count.get(r.surname) ?? 0) + 1);
const surnames = [...count.entries()].sort((a, b) => b[1] - a[1]);

if (process.argv.includes('--surnames')) {
  console.log(surnames.map(([s]) => s).join(', '));
} else {
  for (const r of rows) console.log(`${r.ep}  ${r.name.padEnd(22)} ${r.role}`);
  console.log(`\nHọ đã dùng (số lần): ${surnames.map(([s, n]) => `${s} ${n}`).join(', ')}`);
}
