#!/usr/bin/env node
// Công cụ hỗ trợ đọc soát kịch bản (bước 4B). Không sửa file, chỉ in danh sách chỗ nghi ngờ để người đọc kiểm.
// Cách dùng:  node scripts/soat-doc.mjs tc005
// Báo: tên riêng chỉ xuất hiện 1–2 lần (nghi gõ sai hoặc nhân vật bỏ rơi), tên cùng họ khác tên, lỗi chính tả hình thức
// (hai dấu cách, từ lặp liền nhau, thiếu dấu cách sau dấu câu, câu bắt đầu chữ thường), câu trùng lặp, từ dịch thô,
// và câu đầu/cuối từng chương để soát nhịp (hook mở, cliffhanger).

import fs from 'node:fs';
import path from 'node:path';
import {epPaths} from './lib/paths.mjs';

const E = epPaths(process.argv[2]);
const files = fs.readdirSync(E.script).filter((f) => /^ch\d+\.tts\.txt$/.test(f)).sort();
if (!files.length) throw new Error('Chưa có chNN.tts.txt');

const STILTED = ['đồng chí', 'khoảnh khắc ấy', 'thượng đế', 'vô cùng vô cùng', 'không khỏi', 'chăm chú dõi theo', 'một cách', 'hết sức hết sức'];
const NOT_NAME = new Set(['Tôi', 'Anh', 'Chị', 'Em', 'Bố', 'Mẹ', 'Ông', 'Bà', 'Cô', 'Cậu', 'Chú', 'Dì', 'Con', 'Các', 'Mọi', 'Nếu', 'Nhưng', 'Rồi', 'Khi', 'Lần', 'Kiếp', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Hôm', 'Sáng', 'Chiều', 'Tối', 'Đêm', 'Còn', 'Vậy', 'Thế', 'Đó', 'Đây', 'Chỉ', 'Cả', 'Nó', 'Hắn', 'Họ', 'Chúng', 'Ai', 'Gì', 'Sau', 'Trước', 'Từ', 'Có', 'Không', 'Và', 'Vì', 'Nhưng', 'Thì', 'Là', 'Đã', 'Tiếng', 'Giọng', 'Ngoài', 'Trong', 'Trên', 'Dưới', 'Bên', 'Mặt', 'Tay', 'Mắt', 'Cánh', 'Hai', 'Người', 'Hôm', 'Tuần', 'Tháng', 'Ngày', 'Đúng', 'Phải', 'Được', 'Cái', 'Chuyện', 'Đừng', 'Xin', 'Cảm', 'Dạ', 'Vâng', 'Ừ', 'Rất', 'Mỗi', 'Những', 'Nhìn', 'Nghe', 'Tôi', 'Hãy', 'Giờ', 'Lúc', 'Thật', 'Trời', 'Bác', 'Thầy', 'Hà', 'Quýt']);

const chapters = files.map((f) => ({f, text: fs.readFileSync(path.join(E.script, f), 'utf8')}));
const issues = [];
const note = (f, msg) => issues.push(`  ${f}: ${msg}`);

// 1. Tên riêng: chuỗi 2–3 chữ viết hoa liên tiếp, đứng giữa câu hoặc đầu câu nhưng không thuộc danh sách từ thường.
const names = new Map();
for (const {f, text} of chapters) {
  for (const m of text.matchAll(/(?<![\p{L}])(\p{Lu}[\p{Ll}]+(?: \p{Lu}[\p{Ll}]+){1,2})(?![\p{L}])/gu)) {
    const first = m[1].split(' ')[0];
    if (NOT_NAME.has(first)) continue;
    const e = names.get(m[1]) ?? {n: 0, ch: new Set()};
    e.n++; e.ch.add(f.slice(2, 4));
    names.set(m[1], e);
  }
}
const nameList = [...names.entries()].sort((a, b) => b[1].n - a[1].n);

// 2. Chính tả hình thức, từ dịch thô, câu trùng
const seen = new Map();
for (const {f, text} of chapters) {
  text.split('\n').forEach((line, i) => {
    const where = `dòng ${i + 1}`;
    if (/ {2,}/.test(line)) note(f, `${where}: hai dấu cách liền`);
    const rep = line.match(/(?<![\p{L}])(\p{L}+) \1(?![\p{L}])/iu);
    if (rep && !['rất', 'từng', 'đều', 'mãi', 'xa', 'ha', 'dần'].includes(rep[1].toLowerCase())) note(f, `${where}: từ lặp liền "${rep[0]}"`);
    if (/[,.;:!?][\p{L}]/u.test(line.replace(/\d[.,]\d/g, ''))) note(f, `${where}: thiếu dấu cách sau dấu câu`);
    for (const s of line.split(/(?<=[.!?])\s+/)) {
      const t = s.trim();
      if (!t) continue;
      if (/^\p{Ll}/u.test(t) && !/^[a-zđ]+: /.test(t)) note(f, `${where}: câu bắt đầu chữ thường "${t.slice(0, 30)}…"`);
      const words = t.split(/\s+/).length;
      if (words >= 7) {
        const k = t.toLowerCase();
        if (seen.has(k)) note(f, `${where}: câu trùng với ${seen.get(k)} "${t.slice(0, 40)}…"`);
        else seen.set(k, f);
      }
    }
    for (const w of STILTED) if (line.toLowerCase().includes(w)) note(f, `${where}: từ nặng mùi dịch/văn mẫu "${w}"`);
  });
}

// ---- In báo cáo ----
console.log(`\n== ${E.name}: ${files.length} chương ==`);
console.log('\nTên riêng (số lần, các chương). Kiểm: viết sai, cùng người hai tên, người xuất hiện một lần rồi mất:');
for (const [n, e] of nameList.slice(0, 40)) console.log(`  ${String(e.n).padStart(3)}  ${n}  [ch ${[...e.ch].join(',')}]${e.n <= 2 ? '   ← ít' : ''}`);
const byLast = new Map();
for (const [n] of nameList) { const l = n.split(' ').slice(-1)[0]; byLast.set(l, [...(byLast.get(l) ?? []), n]); }
const clash = [...byLast.values()].filter((a) => a.length > 1);
if (clash.length) { console.log('\nCùng chữ cuối, khác tên (có thể là một người gọi hai cách):'); for (const a of clash) console.log('  ' + a.join(' | ')); }
console.log(`\nChỗ nghi ngờ (${issues.length}):`);
console.log(issues.length ? issues.slice(0, 80).join('\n') : '  (không có)');
console.log('\nCâu đầu và câu cuối từng chương (soát hook mở, nhịp, cliffhanger):');
for (const {f, text} of chapters) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const cut = (s) => (s.length > 130 ? s.slice(0, 127) + '…' : s);
  console.log(`  ${f}\n    đầu : ${cut(lines[0])}\n    cuối: ${cut(lines[lines.length - 1])}`);
}
