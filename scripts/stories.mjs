#!/usr/bin/env node
// Danh mục kho truyện kèm trạng thái, tính từ file thật (không phải ghi tay).
// Dùng: node scripts/stories.mjs [--todo|--doing|--done] [--genre=tc]
//   chưa làm = chưa có thư mục tập; đang làm = có tập, chưa xong 7 bước; đã làm = xong 7 bước hoặc đã đăng YouTube
//   (tập đã đăng có thể đã dọn audio/video local, nên "đã đăng" thắng trạng thái file).
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, GENRES, ID_RE} from './lib/paths.mjs';
import {status} from './status.mjs';

const args = process.argv.slice(2);
const filter = ['todo', 'doing', 'done'].find((k) => args.includes(`--${k}`));
const only = args.find((a) => a.startsWith('--genre='))?.slice(8);
const LABEL = {todo: '○ chưa làm', doing: '◐ đang làm', done: '✓ đã làm'};

let count = {todo: 0, doing: 0, done: 0};
for (const [code, g] of Object.entries(GENRES)) {
  if (only && only !== code) continue;
  const dir = path.join(ROOT, 'stories', g.dir);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md') && ID_RE.test(f)).sort() : [];
  const rows = [];
  for (const f of files) {
    const id = f.match(ID_RE)[0];
    const title = fs.readFileSync(path.join(dir, f), 'utf8').split('\n')[0].replace(/^#\s*\S+?\.\s*/, '');
    let state = 'todo', note = '';
    try {
      const r = status(id);
      state = r.posted ? 'done' : r.current ? 'doing' : 'done';
      note = r.posted ? 'đã đăng YouTube' : r.current ? `bước ${r.current}. ${r.currentName}` : '';
    } catch { /* chưa có thư mục tập */ }
    count[state]++;
    if (!filter || filter === state) rows.push(`  ${id}  ${LABEL[state]}${note ? ` (${note})` : ''}  ${title}`);
  }
  if (rows.length) console.log(`\n[${code}] ${g.name}  (stories/${g.dir}/)\n${rows.join('\n')}`);
}
console.log(`\nTổng: ${count.todo} chưa làm, ${count.doing} đang làm, ${count.done} đã làm`);
