// Kiểm tra episode.json. Không import gì của Remotion để script Node nạp thẳng được (Node 22.18+ chạy file .ts).
// Trả về danh sách lỗi tiếng Việt; rỗng = hợp lệ.
const filled = (v: unknown) => typeof v === 'string' && v.trim() !== '';
const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export const validateEpisode = (p: Record<string, any>, opts: {needThumb?: boolean} = {}): string[] => {
  const e: string[] = [];
  for (const k of ['title', 'audioSrc', 'footageTag']) if (!filled(p[k])) e.push(`"${k}" đang trống${k === 'audioSrc' ? ' (chạy node scripts/build-audio.mjs để điền)' : ''}`);
  if (opts.needThumb) for (const k of ['thumbText', 'thumbBg']) if (!filled(p[k])) e.push(`"${k}" đang trống (ảnh bìa cần cả chữ và ảnh nền)`);
  if (filled(p.thumbText) && p.thumbText.split('|').length > 4) e.push('"thumbText" tối đa 4 dòng (ngắt bằng "|")');
  if (p.thumbAlt != null && !Array.isArray(p.thumbAlt)) e.push('"thumbAlt" phải là mảng [{thumbText, thumbBg, thumbFocus, thumbTag}]');
  else (p.thumbAlt ?? []).forEach((v: any, i: number) => {
    if (typeof v?.thumbText === 'string' && v.thumbText.split('|').length > 4) e.push(`thumbAlt[${i}].thumbText tối đa 4 dòng`);
  });
  if (p.captionsSrc != null && typeof p.captionsSrc !== 'string') e.push('"captionsSrc" phải là chữ ("" = tắt phụ đề)');
  if (!(num(p.dim) && p.dim >= 0 && p.dim <= 1)) e.push('"dim" phải là số từ 0 đến 1');
  if (!(num(p.introSec) && p.introSec >= 0)) e.push('"introSec" phải là số >= 0 (build-audio điền)');

  const chapters = p.chapters;
  if (!Array.isArray(chapters) || !chapters.length) e.push('"chapters" phải là mảng có ít nhất một chương');
  else {
    chapters.forEach((c, i) => {
      if (!filled(c?.title)) e.push(`chapters[${i}].title đang trống`);
      if (!num(c?.startSec)) e.push(`chapters[${i}].startSec chưa có (chạy node scripts/build-audio.mjs)`);
      else if (i > 0 && num(chapters[i - 1]?.startSec) && c.startSec < chapters[i - 1].startSec) e.push(`chapters[${i}].startSec nhỏ hơn chương trước`);
    });
    if (chapters.length > 1 && chapters.every((c) => c?.startSec === 0)) e.push('mọi startSec đều bằng 0: chạy node scripts/build-audio.mjs');
  }

  if (!Array.isArray(p.parts) || !p.parts.length) e.push('"parts" phải là mảng có ít nhất một phần TikTok');
  else {
    const n = Array.isArray(chapters) ? chapters.length : 0;
    p.parts.forEach((part: any, i: number) => {
      const c = part?.chapters;
      const okRange = Array.isArray(c) && c.length >= 1 && c.length <= 2 && c.every((x: unknown) => Number.isInteger(x) && (x as number) >= 1 && (x as number) <= n);
      if (!okRange) e.push(`parts[${i}].chapters phải là [đầu] hoặc [đầu, cuối], số chương từ 1 đến ${n}`);
      else if (c.length === 2 && c[0] > c[1]) e.push(`parts[${i}].chapters: chương đầu lớn hơn chương cuối`);
      if (!filled(part?.hook)) e.push(`parts[${i}].hook đang trống`);
    });
    if (p.part != null && !(Number.isInteger(p.part) && p.part >= 0 && p.part <= p.parts.length)) e.push(`"part" phải từ 0 đến ${p.parts.length}`);
  }

  if (p.voice != null) {
    if (typeof p.voice !== 'object') e.push('"voice" phải là object { provider, model, voiceId, language, speed }');
    else if (p.voice.speed != null && !(num(p.voice.speed) && p.voice.speed > 0)) e.push('"voice.speed" phải là số > 0');
  }
  return e;
};
