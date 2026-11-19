import {AbsoluteFill, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {FootageTrack} from './FootageTrack';
import {Captions} from './Captions';
import {fontFamily, TitleCard, CornerLabel, IntroCard} from './ui';
import type {EpisodeProps} from './types';

export const Story = (p: EpisodeProps & {showTitle?: boolean; corner?: string}) => {
  const {fps} = useVideoConfig();
  const totalFrames = Math.ceil(p.audioSec * fps) + fps;
  return (
    <AbsoluteFill style={{backgroundColor: '#000', fontFamily}}>
      <FootageTrack footage={p.footage} cutEverySec={p.cutEverySec} totalFrames={totalFrames} />
      <AbsoluteFill style={{backgroundColor: `rgba(0,0,0,${p.dim})`}} />
      {p.showTitle !== false && p.introSec > 0 && <IntroCard channel={p.episodeLabel} durationInFrames={Math.round(p.introSec * fps)} />}
      {p.showTitle !== false && (
        <Sequence from={Math.round(p.introSec * fps)}>
          <TitleCard text={p.title} durationInFrames={Math.round(p.hookSec * fps)} />
        </Sequence>
      )}
      <CornerLabel text={p.corner ?? p.episodeLabel} />
      <Captions captions={p.introSec > 0 ? p.captions.filter((c) => c.startMs >= p.introSec * 1000 - 50) : p.captions} />
      <Audio src={staticFile(p.audioSrc)} />
    </AbsoluteFill>
  );
};
