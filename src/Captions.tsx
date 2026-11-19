import {useMemo} from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Caption} from '@remotion/captions';
import {buildPages, toWords, type Page} from './captionPages';
import {SAFE} from './ui';

const PageView = ({page, durationFrames}: {page: Page; durationFrames: number}) => {
  const frame = useCurrentFrame();
  const {fps, height} = useVideoConfig();
  const pop = interpolate(frame, [0, 5], [0.94, 1], {extrapolateRight: 'clamp'});
  const fadeIn = interpolate(frame, [0, 4], [0, 1], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [durationFrames - 4, durationFrames], [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', paddingTop: Math.round(height * 0.6),
                          paddingLeft: SAFE.left, paddingRight: SAFE.right}}>
      <div style={{
        opacity: Math.min(fadeIn, fadeOut), transform: `scale(${pop})`,
        background: 'rgba(12, 12, 16, 0.5)', borderRadius: 36, padding: '22px 38px 26px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
        color: '#fff', fontSize: 64, fontWeight: 800, lineHeight: 1.28, textAlign: 'center',
        textWrap: 'balance', letterSpacing: 0.2,
      }}>
        {page.words.map((w) => w.text).join(' ')}
      </div>
    </AbsoluteFill>
  );
};

export const Captions = ({captions}: {captions: Caption[]}) => {
  const {fps} = useVideoConfig();
  const pages = useMemo(() => buildPages(toWords(captions)), [captions]);
  return (
    <>
      {pages.map((page, i) => {
        const from = Math.round((page.startMs / 1000) * fps);
        // giữ chữ tới khi trang sau bắt đầu (tối đa 0,5 giây) để không nháy tắt giữa hai trang
        const nextStart = pages[i + 1]?.startMs ?? page.endMs + 500;
        const endMs = Math.min(Math.max(page.endMs + 120, page.endMs), Math.max(nextStart, page.endMs + 120));
        const holdMs = Math.min(endMs, page.endMs + 500);
        const dur = Math.max(6, Math.round(((holdMs - page.startMs) / 1000) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <PageView page={page} durationFrames={dur} />
          </Sequence>
        );
      })}
    </>
  );
};
