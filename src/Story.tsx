import {AbsoluteFill, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {FootageTrack} from './FootageTrack';
import {Captions} from './Captions';
import {fontFamily, Watermark} from './ui';
import type {EpisodeProps} from './types';

export const Story = (p: EpisodeProps & {corner?: string}) => {
  const {fps} = useVideoConfig();
  const totalFrames = Math.ceil(p.audioSec * fps) + fps;
  return (
    <AbsoluteFill style={{backgroundColor: '#000', fontFamily}}>
      <FootageTrack footage={p.footage} totalFrames={totalFrames} />
      <AbsoluteFill style={{backgroundColor: `rgba(0,0,0,${p.dim})`}} />
      <Watermark label={p.corner} />
      <Captions captions={p.introSec > 0 ? p.captions.filter((c) => c.startMs >= p.introSec * 1000 - 50) : p.captions} />
      <Audio src={staticFile(p.audioSrc)} />
    </AbsoluteFill>
  );
};
