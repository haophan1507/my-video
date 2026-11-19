// Ghi nhớ từng file giọng đã gen bằng chữ + cài đặt nào, để lần sau chỉ gen lại chương đã đổi (tiết kiệm credit).
// File: <thư mục audio>/voice-meta.json = { "ch01.mp3": { hash, chars, provider, model, voice, speed, lang, credits, at } }
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const META_FILE = 'voice-meta.json';

/** Dấu vân tay của một lần gen: đổi chữ, giọng, tốc độ, model hoặc dịch vụ thì hash đổi. */
export const voiceHash = (text, s) =>
  createHash('sha1').update(JSON.stringify([text, s.provider, s.model ?? null, s.voice, s.speed, s.lang])).digest('hex').slice(0, 16);

export const readVoiceMeta = (dir) => {
  try { return JSON.parse(fs.readFileSync(path.join(dir, META_FILE), 'utf8')); } catch { return {}; }
};

export const writeVoiceMeta = (dir, meta) =>
  fs.writeFileSync(path.join(dir, META_FILE), JSON.stringify(meta, null, 2) + '\n');
