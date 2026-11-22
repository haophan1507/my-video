import {useMemo} from 'react';
import {Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import type {FootageItem} from './types';

const FADE_SEC = 1; // mờ chéo giữa hai clip (xem references/edit-yeu-cau.md)
// Clip khác tỉ lệ khung: phủ kín (cắt mép) nếu phần bị cắt ≤ 20% diện tích, ngược lại hiện trọn clip với viền đen.
// Ví dụ khung ngang 16:9: clip 16:9 phủ kín; clip dọc 9:16 hoặc 4:3 có viền đen trái phải.
const MAX_CROP = 0.2;
const fitFor = (item: FootageItem, frameRatio: number): 'cover' | 'contain' => {
  if (!item.width || !item.height) return 'cover';
  const r = item.width / item.height;
  return 1 - Math.min(r, frameRatio) / Math.max(r, frameRatio) <= MAX_CROP ? 'cover' : 'contain';
};

const Fading = ({fade, children}: {fade: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame();
  const opacity = fade > 0 ? interpolate(frame, [0, fade], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  return <div style={{position: 'absolute', inset: 0, opacity}}>{children}</div>;
};

// Footage chạy liền như video gốc: mỗi clip phát trọn từ đầu đến hết theo thứ tự tên file (các clip của một tag
// là đoạn cắt liên tiếp của cùng một nguồn), hết clip mới sang clip sau; hết cả tag thì quay lại clip đầu.
// Bản TikTok (Clip) cắt Story theo mốc thời gian nên lấy đúng đoạn footage như bản YouTube.
export const FootageTrack = ({footage, totalFrames, offset = 0, dim = 0}: {footage: FootageItem[]; totalFrames: number; offset?: number; dim?: number}) => {
  const {fps, width, height} = useVideoConfig();
  const fade = Math.round(FADE_SEC * fps);

  const plan = useMemo(() => {
    const byName = [...footage].sort((a, b) => a.src.localeCompare(b.src));
    const k = ((offset % byName.length) + byName.length) % byName.length; // footageOffset: mỗi tập xoay vòng thứ tự clip khác nhau
    const clips = [...byName.slice(k), ...byName.slice(0, k)];
    const out: {src: string; from: number; dur: number; fit: 'cover' | 'contain'; first: boolean; speed: number; skip: number}[] = [];
    let at = 0;
    for (let i = 0; at < totalFrames; i++) {
      const c = clips[i % clips.length];
      const speed = c.speed ?? 1; // tốc độ footage theo tag (public/footage/tags.json)
      const skip = c === byName[0] ? (c.start ?? 0) : 0; // tags.json start: bỏ đoạn đầu clip 01
      const len = Math.max(fade * 2 + 1, Math.floor(((c.sec - skip) / speed) * fps));
      const from = i === 0 ? 0 : at - fade; // clip sau vào sớm một nhịp để mờ chéo
      out.push({src: c.src, from, dur: len, fit: fitFor(c, width / height), first: i === 0, speed, skip});
      at = from + len;
    }
    return out;
  }, [footage, fps, fade, totalFrames, width, height, offset]);

  return (
    <>
      {plan.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur} premountFor={fps}>
          <Fading fade={s.first ? 0 : fade}>
            <Video src={staticFile(s.src)} muted playbackRate={s.speed} trimBefore={Math.round(s.skip * fps)} objectFit={s.fit} style={{width: '100%', height: '100%', filter: dim > 0 ? `brightness(${1 - dim})` : undefined}} />
          </Fading>
        </Sequence>
      ))}
    </>
  );
};
