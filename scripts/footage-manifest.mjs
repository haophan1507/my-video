// node scripts/footage-manifest.mjs — tạo public/footage/manifest.json (chạy ở đâu cũng được)
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT} from './lib/paths.mjs';

const dir = path.join(ROOT, 'public', 'footage');
const sec = (f) => Number(execFileSync('ffprobe',
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const items = fs.readdirSync(dir).filter((f) => f.endsWith('.mp4')).sort()
  .map((f) => ({src: `footage/${f}`, sec: sec(`${dir}/${f}`)}));
fs.writeFileSync(`${dir}/manifest.json`, JSON.stringify(items, null, 2));
console.log(`${items.length} clip`);
