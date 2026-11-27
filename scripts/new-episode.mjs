#!/usr/bin/env node
// Mở tập mới từ truyện trong kho: tạo episodes/<thể-loại>/<mã>-slug/ (tap.md, episode.json, script/).
// Không thêm dòng vào bảng "Các tập": bảng chỉ ghi tập đã có quyết định (xem stories/README.md).
// Tập đã có thì bỏ qua, không ghi đè.
// Dùng: node scripts/new-episode.mjs tc004 [ts003 ...]   |   --all (mọi truyện chưa có tập)   |   --genre=tc kèm --all
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, GENRES, ID_RE} from './lib/paths.mjs';

const args = process.argv.slice(2);
const all = args.includes('--all');
const genreArg = args.find((a) => a.startsWith('--genre='))?.split('=')[1];
const ids = args.filter((a) => !a.startsWith('--'));
if (!all && !ids.length) {
  console.error('Dùng: node scripts/new-episode.mjs tc004 [ts003 ...] | --all [--genre=tc]');
  process.exit(1);
}

const d = new Date();
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; // ngày giờ máy

// Mọi truyện trong kho: {id, genre, name (tên file bỏ .md), file, title}
const stories = Object.entries(GENRES).flatMap(([code, g]) => {
  const dir = path.join(ROOT, 'stories', g.dir);
  return (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
    .filter((f) => f.endsWith('.md') && f.startsWith(code))
    .map((f) => {
      const file = path.join(dir, f);
      const head = fs.readFileSync(file, 'utf8').split('\n', 1)[0];
      return {
        id: f.match(ID_RE)[0], genre: g.dir, name: f.replace(/\.md$/, ''),
        rel: `stories/${g.dir}/${f}`, title: head.replace(/^#\s*[a-z]{2}\d+\.\s*/, '').trim(),
      };
    });
});
const byId = new Map(stories.map((s) => [s.id, s]));

const epExists = (s) => {
  const base = path.join(ROOT, 'episodes', s.genre);
  return fs.existsSync(base) && fs.readdirSync(base).some((d) => d === s.id || d.startsWith(`${s.id}-`));
};

let targets;
if (all) targets = stories.filter((s) => !genreArg || s.id.startsWith(genreArg));
else {
  const unknown = ids.filter((i) => !byId.has(i));
  if (unknown.length) { console.error(`Không có truyện: ${unknown.join(', ')}`); process.exit(1); }
  targets = ids.map((i) => byId.get(i));
}

const tapTpl = fs.readFileSync(path.join(ROOT, 'references', 'tap-mau.md'), 'utf8');
const epTpl = fs.readFileSync(path.join(ROOT, 'references', 'episode-mau.json'), 'utf8');
const made = [];

for (const s of targets) {
  if (epExists(s)) { console.log(`bỏ qua ${s.id}: đã có tập`); continue; }
  const dir = path.join(ROOT, 'episodes', s.genre, s.name);
  fs.mkdirSync(path.join(dir, 'script'), {recursive: true});
  const tap = tapTpl
    .replace('# <mã>: <tên tập>', `# ${s.id}: ${s.title}`)
    .replace('<mã, đường dẫn trong stories/>', `${s.id}, ${s.rel}`)
    .replace(/<yyyy-mm-dd>/g, today);
  fs.writeFileSync(path.join(dir, 'tap.md'), tap);
  const ep = JSON.parse(epTpl);
  ep.title = s.title;
  ep.footageTag = ''; // chọn ở bước 6; để trống thì status.mjs báo chưa có footage
  fs.writeFileSync(path.join(dir, 'episode.json'), JSON.stringify(ep, null, 2) + '\n');

  made.push(s.id);
  console.log(`mở ${s.id}: episodes/${s.genre}/${s.name}/`);
}

console.log(`\nĐã mở ${made.length} tập.`);
