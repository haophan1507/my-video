import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {Story} from './Story';
import {TitleCard, fontFamily} from './ui';
import {brand} from './brand';
import {partRange, type EpisodeProps} from './types';

export const Clip = (p: EpisodeProps) => {
  const {fps} = useVideoConfig();
  const {startSec} = partRange(p);
  const part = p.parts[p.part - 1];
  return (
    <AbsoluteFill style={{fontFamily}}>
      <Sequence trimBefore={Math.round(startSec * fps)}>
        <Story {...p} showTitle={false} corner={brand.partLabel(p.part, p.parts.length)} />
      </Sequence>
      <TitleCard text={part.hook} durationInFrames={Math.round(p.hookSec * fps)} />
    </AbsoluteFill>
  );
};
