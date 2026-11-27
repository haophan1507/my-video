#!/usr/bin/env node
// Soát và chuẩn hóa kịch bản tiếng Việt trước khi gen giọng (TTS).
// Cách dùng:  node scripts/normalize-vi.mjs tc005 [--fix]
// Làm việc trực tiếp trên chNN.tts.txt (file duy nhất của chương). Mặc định chỉ in báo cáo những chỗ cần sửa tay;
// --fix ghi đè tại chỗ sau khi đổi số, tiền, giờ, ngày, phần trăm thành chữ, mở viết tắt, bỏ markdown/emoji (chạy lại nhiều lần vẫn an toàn).

import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {epPaths, ID_RE} from './lib/paths.mjs';

// ---- Cấu hình: chỉnh theo giọng đọc của kênh ----
const LE = 'lẻ';        // 105 = "một trăm lẻ năm"; giọng Bắc hay dùng "linh"
const NGHIN = 'nghìn';  // giọng Nam hay dùng "ngàn"
export const WORDS_PER_MIN = 290; // giọng 1,2, đo trên 32 tập (2026-11-27)
const LONG_SENTENCE = 35; // số chữ

// Viết tắt -> cách đọc. So khớp không phân biệt hoa thường, giữ hoa chữ đầu. Bổ sung dần.
export const ABBR = [
  ['TP.HCM', 'Thành phố Hồ Chí Minh'],
  ['TPHCM', 'Thành phố Hồ Chí Minh'],
  ['TP HCM', 'Thành phố Hồ Chí Minh'],
  ['HN', 'Hà Nội'],
  ['v.v.', 'vân vân'],
  ['vv', 'vân vân'],
  ['ko', 'không'],
  ['k0', 'không'],
  ['đc', 'được'],
  ['dc', 'được'],
  ['bt', 'bình thường'],
  ['ng', 'người'],
  ['vs', 'với'],
  ['CEO', 'giám đốc'],
  ['GĐ', 'giám đốc'],
  ['BV', 'bệnh viện'],
  ['ĐH', 'đại học'],
];

// ---- Đọc số ----
const D = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

// n: 0..999. full = nhóm đứng sau nhóm khác, phải đọc đủ "không trăm", "lẻ".
const read3 = (n, full) => {
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), u = n % 10;
  const out = [];
  if (h || full) out.push(D[h], 'trăm');
  if (t === 0) {
    if (u && (h || full)) out.push(LE, D[u]);
    else if (u) out.push(D[u]);
  } else if (t === 1) {
    out.push('mười');
    if (u === 5) out.push('lăm');
    else if (u) out.push(D[u]);
  } else {
    out.push(D[t], 'mươi');
    if (u === 1) out.push('mốt');
    else if (u === 4) out.push('tư');
    else if (u === 5) out.push('lăm');
    else if (u) out.push(D[u]);
  }
  return out.join(' ');
};

const belowBillion = (n, full) => {
  const groups = [n % 1000, Math.floor(n / 1000) % 1000, Math.floor(n / 1e6)];
  const units = ['', ` ${NGHIN}`, ' triệu'];
  const parts = [];
  let lead = !full;
  for (let i = 2; i >= 0; i--) {
    if (!groups[i]) continue;
    parts.push(read3(groups[i], !lead) + units[i]);
    lead = false;
  }
  return parts.join(' ');
};

export const readInt = (n) => {
  if (n === 0) return 'không';
  if (n >= 1e9) {
    const lo = n % 1e9;
    return `${readInt(Math.floor(n / 1e9))} tỷ` + (lo ? ` ${belowBillion(lo, true)}` : '');
  }
  return belowBillion(n, false);
};

const readDigits = (s) => [...s].filter((c) => /\d/.test(c)).map((c) => D[+c]).join(' ');

// "2.000.000" | "3,5" | "1.5" | "007" -> chữ
export const readNumber = (raw) => {
  let int = raw, frac = '';
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(raw)) [int, frac = ''] = raw.replace(/\./g, '').split(',');
  else if (/^\d+[.,]\d+$/.test(raw)) [int, frac] = raw.split(/[.,]/);
  if (int.length > 1 && int.startsWith('0')) return readDigits(int);
  let out = readInt(Number(int));
  if (frac) {
    const f = frac.length <= 2 && !frac.startsWith('0') ? readInt(Number(frac)) : readDigits(frac);
    out += ` phẩy ${f}`;
  }
  return out;
};

// ---- Biến đổi văn bản ----
const NUM = String.raw`\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:[.,]\d+)?`;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// "Ko" -> "Không"; chữ viết tắt toàn hoa ("CEO") giữ nguyên cách viết của bảng
const keepCase = (orig, rep) => (/^\p{Lu}\p{Ll}/u.test(orig) ? rep[0].toUpperCase() + rep.slice(1) : rep);
const month = (m) => (m === 4 ? 'tư' : readInt(m));

export const normalize = (text) => {
  let s = text.replace(/\r\n?/g, '\n');

  // Markdown, emoji, ký hiệu
  s = s.replace(/^\s*#{1,6}\s*/gm, '')
    .replace(/^\s*(?:-{3,}|\*{3,})\s*$/gm, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s*[-–—•*]\s+/gm, '') // gạch đầu dòng thoại
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '')
    .replace(/[“”„«»]/g, '"').replace(/[‘’]/g, "'")
    .replace(/([!?])\1+/g, '$1');

  // Viết tắt
  for (const [abbr, rep] of ABBR) {
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(abbr)}(?![\\p{L}\\p{N}])`, 'giu');
    s = s.replace(re, (m) => keepCase(m, rep));
  }

  // Số điện thoại: đọc từng chữ số. Không bắt nhầm nhóm "000" bên trong số có dấu chấm ngăn cách
  // ("1.000.000.000"): trước số không được là chữ số (kèm dấu . hoặc ,), sau số không là ",chữ số" hoặc ".chữ số".
  s = s.replace(/(?<!\p{N}[.,]?)0\d{2,3}[ .]?\d{3}[ .]?\d{3,4}(?!\p{N}|[.,]\p{N})/gu, (m) => readDigits(m));

  // Giờ: 7h30, 7:30, 7 giờ 30, 7h
  s = s.replace(/(?<![\p{L}\p{N}])(\d{1,2})\s?(?:h|giờ|:)\s?(\d{2})(?![\p{L}\p{N}])/gu, (m, h, mi) =>
    +mi ? `${readInt(+h)} giờ ${readInt(+mi)} phút` : `${readInt(+h)} giờ`);
  s = s.replace(/(?<![\p{L}\p{N}])(\d{1,2})h(?![\p{L}\p{N}])/gu, (m, h) => `${readInt(+h)} giờ`);

  // Ngày: 15/7, 15/7/2024 (thêm "ngày" nếu phía trước chưa có)
  s = s.replace(/(?<![\p{N}\/])(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?(?![\p{N}\/])/gu, (m, d, mo, y, off, all) => {
    if (+d < 1 || +d > 31 || +mo < 1 || +mo > 12) return m;
    const before = all.slice(Math.max(0, off - 7), off);
    const pre = /(ngày|đêm|sáng|trưa|chiều|tối|hôm|mùng)\s*$/iu.test(before) ? '' : 'ngày ';
    return `${pre}${readInt(+d)} tháng ${month(+mo)}` + (y ? ` năm ${readInt(+y)}` : '');
  });

  // Tiền, phần trăm
  s = s.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${NUM})\\s?(k|K)(?![\\p{L}])`, 'gu'), (m, n) => `${readNumber(n)} ${NGHIN}`);
  s = s.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${NUM})\\s?(tr|củ)(?![\\p{L}])`, 'gu'), (m, n) => `${readNumber(n)} triệu`);
  s = s.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${NUM})\\s?(đ|VNĐ|VND|vnđ)(?![\\p{L}])`, 'gu'), (m, n) => `${readNumber(n)} đồng`);
  s = s.replace(new RegExp(`\\$\\s?(${NUM})`, 'gu'), (m, n) => `${readNumber(n)} đô la`);
  // Nhân dân tệ (truyện bối cảnh Trung Quốc): ¥500, 500¥, 500 NDT/CNY/RMB -> "năm trăm tệ"
  s = s.replace(new RegExp(`[¥￥]\\s?(${NUM})`, 'gu'), (m, n) => `${readNumber(n)} tệ`);
  s = s.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${NUM})\\s?([¥￥]|NDT|CNY|RMB)(?![\\p{L}])`, 'gu'), (m, n) => `${readNumber(n)} tệ`);
  s = s.replace(new RegExp(`(${NUM})\\s?%`, 'gu'), (m, n) => `${readNumber(n)} phần trăm`);

  // Tỉ số "3:2" (không phải giờ, vì phút có hai chữ số) -> "ba hai"
  s = s.replace(/(?<!\p{N})(\d{1,2}):(\d)(?!\p{N})/gu, '$1 $2');

  // Số còn lại
  s = s.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${NUM})(?![\\p{N}])`, 'gu'), (m) => readNumber(m));

  // Khoảng trắng
  s = s.replace(/[ \t]+/g, ' ')
    .replace(/ +([,.!?;:…])/g, '$1')
    .replace(/^ +| +$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s + '\n';
};

// ---- Báo cáo ----
const top = (arr, n = 30) => {
  const c = new Map();
  for (const x of arr) c.set(x, (c.get(x) ?? 0) + 1);
  return [...c].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => (v > 1 ? `${k} (${v})` : k));
};

export const report = (out) => {
  const words = out.match(/[\p{L}\p{N}]+/gu) ?? [];
  const foreign = words.filter((w) => /[fjwzFJWZ]/.test(w) || /^[A-Z]{2,}$/.test(w));
  const sentences = out.split(/(?<=[.!?…])\s+|\n+/).filter((x) => x.trim());
  const long = sentences.filter((x) => (x.match(/[\p{L}\p{N}]+/gu) ?? []).length > LONG_SENTENCE);
  return {
    chars: out.trim().length,
    words: words.length,
    minutes: words.length / WORDS_PER_MIN,
    foreign: top(foreign),
    long: long.map((x) => x.slice(0, 70) + (x.length > 70 ? '…' : '')),
    brackets: out.match(/[(\[][^)\]\n]*[)\]]/g) ?? [],
    digits: top(out.match(/\S*\d\S*/g) ?? []),
  };
};

const printReport = (file, r) => {
  console.log(`\n== ${file}`);
  console.log(`   ${r.chars} ký tự, ${r.words} chữ, ~${r.minutes.toFixed(1)} phút`);
  const list = (label, xs) => xs.length && console.log(`   ${label} (${xs.length}):\n     - ${xs.join('\n     - ')}`);
  list('Tên nước ngoài / viết tắt cần kiểm tra', r.foreign);
  list(`Câu dài hơn ${LONG_SENTENCE} chữ`, r.long);
  list('Ngoặc', r.brackets);
  list('Chữ số còn sót', r.digits);
};

const main = (argv) => {
  const fix = argv.includes('--fix');
  const args = argv.filter((a) => a !== '--fix');
  if (!args.length) {
    console.error('Cách dùng: node scripts/normalize-vi.mjs tc005 [--fix]   (hoặc liệt kê file chNN.tts.txt)');
    process.exit(1);
  }
  // Mã tập: tự lấy mọi script/chNN.tts.txt (không phụ thuộc shell mở glob, chạy được trên Windows)
  let files = args;
  if (args.length === 1 && ID_RE.test(args[0])) {
    const {script} = epPaths(args[0]);
    files = fs.readdirSync(script).filter((f) => /^ch\d+\.tts\.txt$/.test(f)).sort().map((f) => path.join(script, f));
    if (!files.length) { console.error(`Không có chNN.tts.txt trong ${script}`); process.exit(1); }
  }
  let chars = 0, minutes = 0;
  for (const f of files) {
    const out = normalize(fs.readFileSync(f, 'utf8'));
    if (fix) fs.writeFileSync(f, out);
    const r = report(out);
    printReport(f, r);
    chars += r.chars;
    minutes += r.minutes;
  }
  console.log(`
Tổng: ${chars} ký tự, ~${minutes.toFixed(1)} phút${fix ? ' (đã ghi đè tại chỗ)' : ' (chỉ báo cáo; thêm --fix để ghi đè)'}`);
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
