import {useMemo} from 'react';
import {Sequence, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import type {FootageItem} from './types';

const FADE_SEC = 1; // mờ chéo giữa hai clip (xem references/edit-yeu-cau.md)

const Fading = ({fade, children}: {fade: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame();
  const opacity = fade > 0 ? interpolate(frame, [0, fade], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  return <div style={{position: 'absolute', inset: 0, opacity}}>{children}</div>;
};

export const FootageTrack = ({footage, cutEverySec, totalFrames}: {
  footage: FootageItem[]; cutEverySec: number; totalFrames: number;
}) => {
  const {fps} = useVideoConfig();
  const seg = Math.max(1, Math.round(cutEverySec * fps));
  const fade = Math.round(FADE_SEC * fps);

  const plan = useMemo(() => {
    // Xáo trộn cố định theo seed, dùng hết các clip rồi mới lặp lại, không bao giờ trùng clip liền trước
    const order: number[] = [];
    let pool: number[] = [];
    let prev = -1;
    for (let i = 0; i * seg < totalFrames; i++) {
      if (!pool.length) {
        pool = footage.map((_, k) => k).sort((a, b) => random(`o${i}-${a}`) - random(`o${i}-${b}`));
        if (pool[0] === prev && pool.length > 1) pool.push(pool.shift()!);
      }
      prev = pool.shift()!;
      order.push(prev);
    }
    return order.map((k, i) => {
      const room = Math.floor(footage[k].sec * fps) - (seg + fade) - 1;
      return {
        src: footage[k].src, i,
        trimBefore: room > 0 ? Math.floor(random(`start-${i}`) * room) : 0,
        loop: room < 0, // clip ngắn hơn một đoạn thì lặp
      };
    });
  }, [footage, fps, seg, fade, totalFrames]);

  return (
    <>
      {plan.map((s) => {
        const from = s.i === 0 ? 0 : s.i * seg - fade; // đoạn sau bắt đầu sớm một nhịp để mờ chéo
        const dur = s.i === 0 ? seg : seg + fade;
        return (
          <Sequence key={s.i} from={from} durationInFrames={dur} premountFor={fps}>
            <Fading fade={s.i === 0 ? 0 : fade}>
              <Video src={staticFile(s.src)} trimBefore={s.trimBefore} loop={s.loop} muted
                objectFit="cover" style={{width: '100%', height: '100%'}} />
            </Fading>
          </Sequence>
        );
      })}
    </>
  );
};
