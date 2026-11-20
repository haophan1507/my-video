import type {Caption} from '@remotion/captions';

// Một mục trong public/footage/manifest.json (scripts/footage-manifest.mjs ghi)
export type FootageItem = {tag: string; src: string; sec: number; width?: number; height?: number};
export type Chapter = {title: string; startSec: number};
export type Part = {chapters: number[]; hook: string};

// Cài đặt giọng của tập (scripts/gen-voice.mjs đọc; Remotion không dùng). Ghi ở đây để gen lại y hệt.
export type VoiceSettings = {provider?: string; model?: string; voiceId?: string; language?: string; speed?: number};

export type EpisodeProps = {
  voice?: VoiceSettings;
  title: string; // tiêu đề tập, dùng cho đăng bài (không hiện trên hình)
  audioSrc: string; captionsSrc: string; footageTag: string;
  cutEverySec: number; dim: number;
  chapters: Chapter[]; parts: Part[];
  // Ảnh bìa: thumbText dùng "|" ngắt dòng, *chữ* tô màu nhấn; thumbFocus = object-position của ảnh ("50% 30%");
  // thumbTag = nhãn nhỏ dưới hook ("Trọn bộ"), bỏ trống thì ẩn
  thumbText: string; thumbBg: string; thumbFocus?: string; thumbTag?: string;
  coverFocus?: string; // khung ảnh ở bìa TikTok dọc (mặc định theo thumbFocus)
  thumbAlt?: Partial<Pick<EpisodeProps, 'thumbText' | 'thumbBg' | 'thumbFocus' | 'thumbTag'>>[]; // phương án A/B: thumb-2.png...
  part: number;
  introSec: number; // build-audio điền: độ dài đoạn chào kênh ở đầu bản dài (0 = không có)
  // calculateMetadata điền:
  audioSec: number; footage: FootageItem[]; captions: Caption[];
};

// Khoảng thời gian (giây) của bản dài hoặc của Phần n
export const partRange = (p: EpisodeProps) => {
  if (!p.part) return {startSec: 0, endSec: p.audioSec};
  const [a, b = a] = p.parts[p.part - 1].chapters;
  return {
    startSec: p.chapters[a - 1].startSec,
    endSec: p.chapters[b]?.startSec ?? p.audioSec,
  };
};
