#!/usr/bin/env node
// Bước hiện tại của tập, tính từ file thật theo cột "Xong khi" trong SKILL.md (không tin dấu tick trong tap.md).
// Dùng: node scripts/status.mjs tc005 [--json]   |   node scripts/status.mjs   (liệt kê mọi tập)
// Chỉ kiểm được cái đo được (file, số chương, số chữ, mốc sửa file). Việc cần người xem (nghe thử, duyệt dàn ý) vẫn do người quyết.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {ROOT, GENRES, ID_RE, epPaths, channelName, CHAPTER_GAP} from './lib/paths.mjs';
import {report, WORDS_PER_MIN} from './normalize-vi.mjs';

const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const ls = (dir, re) => { try { return fs.readdirSync(dir).filter((f) => re.test(f)).sort(); } catch { return []; } };
const mtime = (f) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
const words = (s) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length;
const vi = (n) => n.toLocaleString('vi-VN');
const sec = (f) => {
  try {
    const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], {encoding: 'utf8'});
    return Number(r.stdout.trim()) || 0;
  } catch { return 0; }
};
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const dims = (f) => {
  try {
    const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', f], {encoding: 'utf8'});
    return r.stdout.trim();
  } catch { return ''; }
};

const CHAPTERS = [6, 12];      // số chương (viết mới nhắm 8–12; 6–7 giữ cho tập cũ)
const WORDS = [700, 1400];     // chữ mỗi chương (viết mới nhắm 900–1.400; 700 giữ cho tập cũ)
const MIN_TOTAL = 6900;        // ~24 phút ở giọng 1,2 (~290 chữ/phút); mục tiêu 25 phút, có dung sai

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
    // Tập đã gen giọng hoặc đã đăng thì không xét lại độ dài
    const short = total < MIN_TOTAL && !ls(E.audio, /^ch\d+\.mp3$/).length && !/đã đăng YouTube/.test(tap ?? '');
    if (short) detail.push(`thiếu ${vi(MIN_TOTAL - total)} chữ để đạt ngưỡng ~24 phút`);
    if (bad.length) detail.push(`ngoài ${vi(WORDS[0])}–${vi(WORDS[1])} chữ: ${bad.map(([f, c]) => `${f} (${vi(c)})`).join(', ')}`);
    step('Viết chương', okCount && !bad.length && !short ? 'done' : 'partial', detail.join('; '));
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

  // 6. Footage: tag phải phủ được độ dài tập. Tag ngắn hơn thì vẫn render được nhưng footage lặp lại
  // (nguồn nên dài ≥ độ dài tập), nên chỉ báo partial; không đặt chỉ tiêu số clip.
  const manifest = readJson(path.join(ROOT, 'public', 'footage', 'manifest.json')) ?? [];
  const tags = readJson(path.join(ROOT, 'public', 'footage', 'tags.json')) ?? {};
  const code = path.basename(E.dir).split('-')[0];
  const choice = readJson(path.join(ROOT, 'public', 'footage', 'choices.json'))?.[code];
  const tag = choice ?? ep?.footageTag;
  const localTags = [...new Set(manifest.map((f) => f.tag))];
  const clips = !tag ? [] : manifest.filter((f) => f.tag === tag && fs.existsSync(path.join(ROOT, 'public', f.src)));
  const speed = tags[tag]?.speed ?? 1;
  const firstSrc = [...clips].sort((a, b) => a.src.localeCompare(b.src))[0]?.src;
  const usableSec = clips.reduce((n, f) => n + Math.max(0, f.sec - (f.src === firstSrc ? tags[tag]?.start ?? 0 : 0)) / speed, 0);
  const audioDur = ep?.audioSrc ? sec(path.join(ROOT, 'public', ep.audioSrc)) : 0;
  const needSec = audioDur || Math.max(25 * 60, (total / WORDS_PER_MIN) * 60); // tập chưa có audio: ước từ số chữ, tối thiểu 25 phút
  const enough = clips.length > 0 && usableSec >= needSec;
  step('Footage', enough ? 'done' : clips.length ? 'partial' : 'todo',
    !tag ? `chưa chọn tag footage; tag có trên máy này: ${localTags.join(', ') || '(trống)'}; chọn: node scripts/footage-pick.mjs <mã> <tag>`
      : !clips.length ? `tag "${tag}" chưa có trên máy này; có: ${localTags.join(', ') || '(trống)'}; chọn: node scripts/footage-pick.mjs <mã> <tag>`
      : `${clips.length} clip tag "${tag}", ${mmss(usableSec)} sau tốc độ ${speed}${enough ? '' : ` — ngắn hơn tập ${mmss(needSec)}, footage sẽ lặp`}`);

  // 7. Dựng, render
  const nParts = ep?.parts?.length ?? 0;
  const tiktoks = ls(E.out, /^tiktok-\d+\.mp4$/).length;
  const audioBuilt = !!ep?.audioSrc && fs.existsSync(path.join(ROOT, 'public', ep.audioSrc)) && (ep.chapters ?? []).length > 0;
  const missing7 = [];
  if (!ep) missing7.push('episode.json');
  else if (!audioBuilt) missing7.push('audio.mp3 (build-audio)');
  // Đối chiếu audio đã ghép với tổng audio từng chương: file cụt (build bị dừng) vẫn mở được nhưng thiếu truyện.
  const chMp3 = ls(E.audio, /^ch\d+\.mp3$/);
  if (audioBuilt && chMp3.length) {
    const expect = chMp3.reduce((n, f, i) => n + sec(path.join(E.audio, f)) / (ep.voice?.tempo ?? 1) + (i < chMp3.length - 1 ? CHAPTER_GAP : 0), 0)
      + (ep.introSec > 0 ? ep.introSec : 0); // introSec = câu chào + nghỉ, nằm trước chương 1
    if (expect > 0 && Math.abs(audioDur - expect) > 2) missing7.push(`audio.mp3 ${mmss(audioDur)} lệch tổng chương ${mmss(expect)} (chạy lại build-audio)`);
  }
  const posted = /đã đăng YouTube/.test(tap ?? ''); // đăng rồi thì youtube.mp4 được dọn
  if (!posted && !fs.existsSync(path.join(E.out, 'youtube.mp4'))) missing7.push('youtube.mp4');
  if (!nParts || tiktoks < nParts) missing7.push(`tiktok ${tiktoks}/${nParts}`);
  const covers = ls(E.out, /^tiktok-\d+-cover\.png$/).length;
  if (!nParts || covers < nParts) missing7.push(`bìa tiktok ${covers}/${nParts}`);
  const thumbFile = path.join(E.out, 'thumb.png');
  if (!fs.existsSync(thumbFile)) missing7.push('thumb.png');
  else {
    const d = dims(thumbFile);
    if (d && d !== '1280x720') missing7.push(`thumb.png ${d} (cần 1280x720)`);
    const mb = fs.statSync(thumbFile).size / 2 ** 20;
    if (mb > 2) missing7.push(`thumb.png ${mb.toFixed(1)} MB (tối đa 2 MB)`);
  }
  // Tiêu đề đăng bài: hook đứng đầu, đuôi "| <tên kênh> <số>", tổng ≤100 ký tự.
  const dangBai = read(path.join(E.dir, 'dang-bai.md'));
  const title = dangBai?.match(/```\n([^\n]+)\n```/)?.[1]?.trim();
  if (!title) missing7.push('dang-bai.md (thiếu tiêu đề YouTube)');
  else {
    const hook = title.split('|')[0].trim();
    if ([...title].length > 100) missing7.push(`tiêu đề ${[...title].length} ký tự (tối đa 100)`);
    if (!title.includes(`| ${channelName()}`)) missing7.push(`tiêu đề thiếu "| ${channelName()} <số>"`);
    if ([...hook].length > 78) missing7.push(`hook ${[...hook].length} ký tự (tối đa 78)`);
  }
  const lengthNote = audioDur && audioDur < 25 * 60 ? `dài ${mmss(audioDur)}, dưới chuẩn 25 phút` : '';
  // Chuẩn 2026-11-27: chữ bìa trùng hook tiêu đề. Chỉ cảnh báo (không chặn render) vì tập cũ có bìa làm trước chuẩn.
  const norm = (s) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const hookN = title ? norm(title.split('|')[0]) : '', coverN = ep?.thumbText ? norm(ep.thumbText) : '';
  const coverNote = hookN && coverN && !hookN.includes(coverN) && !coverN.includes(hookN) ? 'bìa chưa trùng hook tiêu đề (chuẩn 2026-11-27)' : '';
  const detail7 = [missing7.length ? `thiếu: ${missing7.join(', ')}` : '', lengthNote, coverNote].filter(Boolean).join('; ');
  step('Dựng, render', missing7.length === 0 ? 'done' : ep || tiktoks || audioBuilt ? 'partial' : 'todo', detail7);

  const next = steps.find((s) => s.state !== 'done');
  return {id: E.id, name: E.name, current: next ? next.n : null, currentName: next?.name ?? 'đã xong cả 7 bước', posted: /đã đăng YouTube/.test(tap ?? ''), steps};
}

const print = (r) => {
  const icon = {done: '✓', partial: '◐', todo: '○'};
  console.log(`\n${r.name}: ${r.current ? `bước hiện tại = ${r.current}. ${r.currentName}` : r.currentName}`);
  if (r.posted) console.log('  (đã đăng YouTube: audio/video local có thể đã dọn và máy này có thể không có tag footage, nên bước 5–7 vẫn có thể báo thiếu)');
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
