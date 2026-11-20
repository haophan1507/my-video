#!/usr/bin/env node
// Bước hiện tại của tập, tính từ file thật theo cột "Xong khi" trong SKILL.md (không tin dấu tick trong tap.md).
// Dùng: node scripts/status.mjs tc005 [--json]   |   node scripts/status.mjs   (liệt kê mọi tập)
// Chỉ kiểm được cái đo được (file, số chương, số chữ, mốc sửa file). Việc cần người xem (nghe thử, duyệt dàn ý) vẫn do người quyết.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT, GENRES, ID_RE, epPaths} from './lib/paths.mjs';
import {report} from './normalize-vi.mjs';

const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const ls = (dir, re) => { try { return fs.readdirSync(dir).filter((f) => re.test(f)).sort(); } catch { return []; } };
const mtime = (f) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
const words = (s) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length;
const vi = (n) => n.toLocaleString('vi-VN');

const CHAPTERS = [6, 12];      // số chương
const WORDS = [700, 1100];     // chữ mỗi chương
const MIN_CLIPS = 4;      // clip nền từ 5 phút nên cần ít clip
const MIN_CLIP_SEC = 300;

export function status(arg) {
  const E = epPaths(arg);
  const tap = read(path.join(E.dir, 'tap.md'));
  const ep = readJson(E.json);
  const steps = [];
  const step = (name, state, detail = '') => steps.push({n: steps.length + 1, name, state, detail});
  const pct = (done, total) => (done === 0 ? 'todo' : done === total ? 'done' : 'partial');

  // 1. Chọn truyện
  if (!tap) step('Chọn truyện', 'todo', 'thiếu tap.md');
  else {
    const src = tap.match(/\*\*Truyện nguồn\*\*:\s*([a-z]{2}[0-9]{3,})/)?.[1];
    const cell = (label) => tap.match(new RegExp(`^\\|\\s*${label}[^|]*\\|\\s*([^|]*?)\\s*\\|`, 'm'))?.[1] ?? '';
    const missing = [];
    if (!src || !ls(path.join(ROOT, 'stories', GENRES[src?.slice(0, 2)]?.dir ?? '-'), new RegExp(`^${src}-`)).length) missing.push('truyện nguồn');
    if (!cell('Thể loại')) missing.push('thể loại');
    if (!cell('Điểm')) missing.push('điểm');
    step('Chọn truyện', pct(3 - missing.length, 3), missing.length ? `thiếu: ${missing.join(', ')}` : src);
  }

  // 2. Dàn ý
  const outline = read(path.join(E.dir, 'outline.md'));
  if (!outline) step('Dàn ý', 'todo', 'thiếu outline.md');
  else {
    const nums = new Set([...outline.matchAll(/(?:^|\|)\s*(?:#{1,6}\s*)?(?:\*\*)?Chương\s+(\d{1,2})\b/gim)].map((m) => m[1]));
    const tiktok = /tiktok/i.test(outline);
    const ok = nums.size >= CHAPTERS[0] && nums.size <= CHAPTERS[1] && tiktok;
    step('Dàn ý', ok ? 'done' : 'partial', `${nums.size} chương (cần ${CHAPTERS.join('–')}), ${tiktok ? 'có' : 'thiếu'} bảng chia phần TikTok`);
  }

  // 3. Viết chương: chỉ một file mỗi chương, chNN.tts.txt (viết sẵn dạng máy đọc được)
  const chs = ls(E.script, /^ch\d+\.tts\.txt$/);
  const counts = chs.map((f) => words(read(path.join(E.script, f)) ?? ''));
  const bad = chs.map((f, i) => [f, counts[i]]).filter(([, c]) => c < WORDS[0] || c > WORDS[1]);
  const total = counts.reduce((a, b) => a + b, 0);
  if (!chs.length) step('Viết chương', 'todo', 'chưa có script/chNN.tts.txt');
  else {
    const okCount = chs.length >= CHAPTERS[0] && chs.length <= CHAPTERS[1];
    const detail = [`${chs.length} chương (cần ${CHAPTERS.join('–')}), ${vi(total)} chữ`];
    if (bad.length) detail.push(`ngoài ${vi(WORDS[0])}–${vi(WORDS[1])} chữ: ${bad.map(([f, c]) => `${f} (${vi(c)})`).join(', ')}`);
    step('Viết chương', okCount && !bad.length ? 'done' : 'partial', detail.join('; '));
  }

  // 4. Soát TTS: không còn chữ số hay ngoặc (normalize-vi báo thêm tên ngoại, câu dài để người xem)
  const dirty = chs.filter((f) => { const r = report(read(path.join(E.script, f)) ?? ''); return r.digits.length || r.brackets.length; });
  step('Soát TTS', chs.length ? pct(chs.length - dirty.length, chs.length) : 'todo',
    chs.length ? (dirty.length ? `còn chữ số hoặc ngoặc: ${dirty.join(', ')} (chạy normalize-vi.mjs)` : 'không còn chữ số, ngoặc; tên ngoại và câu dài do bạn soát') : 'chưa có chương');

  // 5. Giọng: mỗi chNN.tts.txt có chNN.mp3 mới hơn
  const ttsFiles = chs;
  const mp3Ok = ttsFiles.filter((f) => mtime(path.join(E.audio, f.replace('.tts.txt', '.mp3'))) >= mtime(path.join(E.script, f)));
  const hasMeta = fs.existsSync(path.join(E.audio, 'voice-meta.json'));
  step('Giọng đọc', ttsFiles.length ? pct(mp3Ok.length, ttsFiles.length) : 'todo',
    ttsFiles.length ? `${mp3Ok.length}/${ttsFiles.length} chương có mp3 mới nhất${mp3Ok.length && !hasMeta ? ' (chưa có voice-meta.json)' : ''}; nghe thử chương 1 do bạn xác nhận` : 'chưa có .tts.txt');

  // 6. Footage
  const manifest = readJson(path.join(ROOT, 'public', 'footage', 'manifest.json')) ?? [];
  const tag = ep?.footageTag;
  const clips = manifest.filter((f) => (!tag || f.tag === tag) && fs.existsSync(path.join(ROOT, 'public', f.src)));
  step('Footage', clips.length >= MIN_CLIPS ? 'done' : clips.length ? 'partial' : 'todo',
    `${clips.length} clip${tag ? ` tag "${tag}"` : ''} (cần ≥ ${MIN_CLIPS})${clips.some((f) => f.sec < MIN_CLIP_SEC) ? `; ${clips.filter((f) => f.sec < MIN_CLIP_SEC).length} clip ngắn hơn 5 phút` : ''}`);

  // 7. Dựng, render
  const nParts = ep?.parts?.length ?? 0;
  const tiktoks = ls(E.out, /^tiktok-\d+\.mp4$/).length;
  const audioBuilt = !!ep?.audioSrc && fs.existsSync(path.join(ROOT, 'public', ep.audioSrc)) && (ep.chapters ?? []).some((c) => c.startSec > 0);
  const missing7 = [];
  if (!ep) missing7.push('episode.json');
  else if (!audioBuilt) missing7.push('audio.mp3 (build-audio)');
  if (!fs.existsSync(path.join(E.out, 'youtube.mp4'))) missing7.push('youtube.mp4');
  if (!nParts || tiktoks < nParts) missing7.push(`tiktok ${tiktoks}/${nParts}`);
  const covers = ls(E.out, /^tiktok-\d+-cover\.png$/).length;
  if (!nParts || covers < nParts) missing7.push(`bìa tiktok ${covers}/${nParts}`);
  if (!fs.existsSync(path.join(E.out, 'thumb.png'))) missing7.push('thumb.png');
  step('Dựng, render', missing7.length === 0 ? 'done' : ep || tiktoks || audioBuilt ? 'partial' : 'todo', missing7.length ? `thiếu: ${missing7.join(', ')}` : '');

  const next = steps.find((s) => s.state !== 'done');
  return {id: E.id, name: E.name, current: next ? next.n : null, currentName: next?.name ?? 'đã xong cả 7 bước', steps};
}

const print = (r) => {
  const icon = {done: '✓', partial: '◐', todo: '○'};
  console.log(`\n${r.name}: ${r.current ? `bước hiện tại = ${r.current}. ${r.currentName}` : r.currentName}`);
  for (const s of r.steps) console.log(`  ${icon[s.state]} ${s.n}. ${s.name}${s.detail ? ` — ${s.detail}` : ''}`);
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const target = args.find((a) => !a.startsWith('--'));
  const ids = target ? [target] : Object.values(GENRES).flatMap((g) => ls(path.join(ROOT, 'episodes', g.dir), ID_RE));
  if (!ids.length) { console.log('Chưa có tập nào trong episodes/'); process.exit(0); }
  const results = ids.map(status);
  if (json) console.log(JSON.stringify(target ? results[0] : results, null, 2));
  else if (target) print(results[0]);
  else for (const r of results) console.log(`${r.name}: ${r.current ? `bước ${r.current}. ${r.currentName}` : r.currentName}`);
}
