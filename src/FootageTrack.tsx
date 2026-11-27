import {useMemo} from 'react';
import {Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import type {FootageItem} from './types';
import {FADE_SEC, planFootage} from './footagePlan';

const Fading = ({fade, children}: {fade: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame();
  const opacity = fade > 0 ? interpolate(frame, [0, fade], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  return <div style={{position: 'absolute', inset: 0, opacity}}>{children}</div>;
};

// Footage chạy liền như video gốc (xem src/footagePlan.ts): mỗi clip phát trọn theo thứ tự tên file, hết clip mới
// sang clip sau; hết cả tag thì quay lại clip đầu. Bản TikTok (Clip) cắt Story theo mốc thời gian nên lấy đúng
// đoạn footage như bản YouTube.
export const FootageTrack = ({footage, totalFrames, offset = 0, dim = 0}: {footage: FootageItem[]; totalFrames: number; offset?: number; dim?: number}) => {
  const {fps, width, height} = useVideoConfig();
  const fade = Math.round(FADE_SEC * fps);

  const plan = useMemo(
    () => planFootage({footage, totalFrames, frameRatio: width / height, fps, offset}),
    [footage, fps, totalFrames, width, height, offset],
  );

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
