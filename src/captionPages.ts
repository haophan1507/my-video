import type {Caption} from '@remotion/captions';

export type Word = {text: string; startMs: number; endMs: number};
export type Page = {words: Word[]; startMs: number; endMs: number};

const MAX_WORDS = 10;
const MAX_CHARS = 44; // ~2 dòng chữ to trên bề ngang an toàn
const MIN_SPLIT = 3;  // trang tối thiểu 3 từ khi phải cắt giữa câu

// Từ không nên đứng cuối trang (kéo sang trang sau cho trọn cụm)
const WEAK_END = new Set(['và', 'của', 'là', 'mà', 'thì', 'ở', 'với', 'cho', 'như', 'một', 'những', 'các',
  'để', 'rằng', 'nhưng', 'nên', 'vì', 'nếu', 'khi', 'trong', 'trên', 'từ', 'đến', 'bởi', 'hay', 'hoặc',
  'cả', 'rất', 'đã', 'sẽ', 'đang', 'cũng', 'vẫn', 'chỉ', 'lại', 'được', 'bị', 'sao', 'nào', 'này', 'đó']);
// Từ nên mở đầu trang mới (ranh giới tự nhiên giữa hai vế)
const GOOD_START = new Set(['và', 'nhưng', 'mà', 'khi', 'nếu', 'rồi', 'vì', 'để', 'còn', 'hay', 'hoặc', 'thì',
  'nên', 'bởi', 'dù', 'tuy', 'sau', 'trước']);

const bare = (t: string) => t.toLowerCase().replace(/[^\p{L}]/gu, '');
const endsSentence = (t: string) => /[.!?…]["”')]?$/.test(t);
const endsClause = (t: string) => /[,;:—–-]["”')]?$/.test(t);

// Ghép token phụ (không có khoảng trắng đầu) vào từ trước, thành từ trọn vẹn
export const toWords = (captions: Caption[]): Word[] => {
  const words: Word[] = [];
  for (const c of captions) {
    const startsNew = /^\s/.test(c.text) || words.length === 0;
    const text = c.text.trim();
    if (!text) continue;
    if (startsNew) words.push({text, startMs: c.startMs, endMs: c.endMs});
    else {
      const w = words[words.length - 1];
      w.text += text;
      w.endMs = c.endMs;
    }
  }
  return words;
};

const chars = (ws: Word[]) => ws.reduce((n, w) => n + w.text.length + 1, 0) - 1;

const isCap = (t: string) => /^\p{Lu}/u.test(t);

// Chọn chỗ cắt trong một câu quá dài: chia gần đều, ưu tiên dấu phẩy / từ nối, tránh cắt giữa tên riêng
const bestSplit = (ws: Word[]): number => {
  const m = Math.max(2, Math.ceil(Math.max(ws.length / MAX_WORDS, chars(ws) / MAX_CHARS)));
  const target = ws.length / m;
  let best = -1, bestCost = Infinity;
  for (let k = Math.min(MIN_SPLIT, ws.length - 2); k <= ws.length - 2; k++) {
    const head = ws.slice(0, k);
    if (head.length > MAX_WORDS || chars(head) > MAX_CHARS) break;
    const last = ws[k - 1], next = ws[k];
    let cost = Math.abs(k - target) * 8;
    if (endsClause(last.text)) cost -= 30;
    if (GOOD_START.has(bare(next.text))) cost -= 14;
    if (next.startMs - last.endMs > 450) cost -= 10; // chỗ người đọc ngưng hơi
    if (WEAK_END.has(bare(last.text))) cost += 40;
    if (isCap(last.text) && isCap(next.text) && !endsSentence(last.text)) cost += 60; // đừng tách tên riêng
    if (cost < bestCost) { bestCost = cost; best = k; }
  }
  return best > 0 ? best : Math.max(1, Math.min(ws.length - 1, MAX_WORDS));
};

export const buildPages = (words: Word[]): Page[] => {
  // 1) Tách theo câu (dấu . ! ?) trước
  const sentences: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    cur.push(w);
    if (endsSentence(w.text)) { sentences.push(cur); cur = []; }
  }
  if (cur.length) sentences.push(cur);

  // 2) Câu ngắn giữ nguyên một trang; câu dài cắt ở chỗ đẹp nhất
  const pages: Word[][] = [];
  for (const s of sentences) {
    let rest = s;
    while (rest.length > MAX_WORDS || chars(rest) > MAX_CHARS) {
      const k = bestSplit(rest);
      pages.push(rest.slice(0, k));
      rest = rest.slice(k);
    }
    if (rest.length) pages.push(rest);
  }

  // 2b) Câu rất ngắn (1–2 từ, ví dụ "Bộp.") ghép với câu liền sau nếu vừa khung, để khỏi nháy chữ lẻ
  for (let i = 0; i < pages.length - 1; i++) {
    if (pages[i].length <= 2 && endsSentence(pages[i][pages[i].length - 1].text) &&
        pages[i].length + pages[i + 1].length <= MAX_WORDS && chars([...pages[i], ...pages[i + 1]]) <= MAX_CHARS) {
      pages.splice(i, 2, [...pages[i], ...pages[i + 1]]);
    }
  }

  // 3) Mẩu 1–2 từ còn thừa sau khi cắt một câu: gộp ngược vào trang trước nếu vẫn vừa khung
  const merged: Word[][] = [];
  for (const p of pages) {
    const prev = merged[merged.length - 1];
    const sameSentence = prev && !endsSentence(prev[prev.length - 1].text);
    if (prev && sameSentence && p.length <= 2 &&
        prev.length + p.length <= MAX_WORDS + 2 && chars([...prev, ...p]) <= MAX_CHARS + 8) {
      prev.push(...p);
    } else merged.push(p);
  }

  return merged.map((ws) => ({words: ws, startMs: ws[0].startMs, endMs: ws[ws.length - 1].endMs}));
};
