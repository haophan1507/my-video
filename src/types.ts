import type {Caption} from '@remotion/captions';

export type FootageItem = {src: string; sec: number};
export type Chapter = {title: string; startSec: number};
export type Part = {chapters: number[]; hook: string};

// Cài đặt giọng của tập (scripts/gen-voice.mjs đọc; Remotion không dùng). Ghi ở đây để gen lại y hệt.
export type VoiceSettings = {provider?: string; model?: string; voiceId?: string; language?: string; speed?: number};

export type EpisodeProps = {
  voice?: VoiceSettings;
  title: string; episodeLabel: string;
  audioSrc: string; captionsSrc: string; footageTag: string;
  cutEverySec: number; dim: number; hookSec: number;
  chapters: Chapter[]; parts: Part[];
  thumbText: string; thumbBg: string;
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
