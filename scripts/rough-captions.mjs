// node scripts/rough-captions.mjs tc005 — phụ đề TẠM: chia thời gian theo số ký tự mỗi chương.
// Không khớp từng chữ với giọng thật (repo không còn công cụ phiên âm); mốc lệch, chỉ để xem thử bố cục phụ đề.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {epPaths} from './lib/paths.mjs';

const E = epPaths(process.argv[2]);
const data = JSON.parse(fs.readFileSync(E.json, 'utf8'));
const dur = (f) => Number(execFileSync('ffprobe',
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const total = dur(`${E.pub}/audio.mp3`);
const captions = [];
data.chapters.forEach((c, i) => {
  const text = fs.readFileSync(`${E.script}/ch${String(i + 1).padStart(2, '0')}.tts.txt`, 'utf8');
  const words = text.split(/\s+/).filter(Boolean);
  const end = data.chapters[i + 1]?.startSec ?? total;
  const span = (end - c.startSec) * 1000 * 0.97; // chừa chút lặng cuối chương
  const chars = words.reduce((n, w) => n + w.length + 1, 0);
  let t = c.startSec * 1000;
  for (const w of words) {
    const d = ((w.length + 1) / chars) * span;
    captions.push({text: (captions.length ? ' ' : '') + w, startMs: Math.round(t), endMs: Math.round(t + d),
      timestampMs: Math.round(t + d / 2), confidence: null});
    t += d;
  }
});
fs.mkdirSync(E.pub, {recursive: true});
fs.writeFileSync(`${E.pub}/captions.json`, JSON.stringify(captions));
console.log(`${captions.length} từ (phụ đề tạm)`);
