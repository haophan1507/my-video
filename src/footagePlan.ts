// Kế hoạch footage của một bản render. Dùng chung cho đường Remotion (src/FootageTrack.tsx) và đường ffmpeg
// (scripts/lib/ffmpeg-render.mjs) để hai đường không lệch nhau. Thuần TypeScript, không import Remotion:
// script Node nạp thẳng file này (Node 22.18+ chạy file .ts).
import type {FootageItem} from './types';

export const FPS = 30;
export const FADE_SEC = 1; // mờ chéo giữa hai clip (xem references/edit-yeu-cau.md)
// Clip khác tỉ lệ khung: phủ kín (cắt mép) nếu phần bị cắt ≤ 20% diện tích, ngược lại hiện trọn clip trên nền kem.
const MAX_CROP = 0.2;

export type PlannedClip = {
  src: string;
  from: number; // khung bắt đầu trong bản render
  dur: number; // số khung
  fit: 'cover' | 'contain';
  first: boolean; // clip đầu: không mờ vào
  speed: number; // tốc độ phát (tags.json)
  skip: number; // giây bỏ ở đầu clip 01 (tags.json start)
};

export const fitFor = (item: FootageItem, frameRatio: number): 'cover' | 'contain' => {
  if (!item.width || !item.height) return 'cover';
  const r = item.width / item.height;
  return 1 - Math.min(r, frameRatio) / Math.max(r, frameRatio) <= MAX_CROP ? 'cover' : 'contain';
};

// Footage chạy liền như video gốc: mỗi clip phát trọn từ đầu đến hết theo thứ tự tên file (các clip của một tag
// là đoạn cắt liên tiếp của cùng một nguồn), hết clip mới sang clip sau; hết cả tag thì quay lại clip đầu.
// offset (footageOffset) xoay vòng danh sách clip để mỗi tập cùng tag vào ở clip khác nhau.
export const planFootage = ({footage, totalFrames, frameRatio, fps = FPS, offset = 0}:
  {footage: FootageItem[]; totalFrames: number; frameRatio: number; fps?: number; offset?: number}): PlannedClip[] => {
  const fade = Math.round(FADE_SEC * fps);
  const byName = [...footage].sort((a, b) => a.src.localeCompare(b.src));
  const k = ((offset % byName.length) + byName.length) % byName.length;
  const clips = [...byName.slice(k), ...byName.slice(0, k)];
  const out: PlannedClip[] = [];
  let at = 0;
  for (let i = 0; at < totalFrames; i++) {
    const c = clips[i % clips.length];
    const speed = c.speed ?? 1;
    const skip = c === byName[0] ? (c.start ?? 0) : 0;
    const len = Math.max(fade * 2 + 1, Math.floor(((c.sec - skip) / speed) * fps));
    const from = i === 0 ? 0 : at - fade; // clip sau vào sớm một nhịp để mờ chéo
    out.push({src: c.src, from, dur: len, fit: fitFor(c, frameRatio), first: i === 0, speed, skip});
    at = from + len;
  }
  return out;
};
