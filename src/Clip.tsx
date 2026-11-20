import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {Story} from './Story';
import {fontFamily} from './ui';
import {brand} from './brand';
import {partRange, type EpisodeProps} from './types';

export const Clip = (p: EpisodeProps) => {
  const {fps} = useVideoConfig();
  const {startSec} = partRange(p);
  return (
    <AbsoluteFill style={{fontFamily}}>
      <Sequence trimBefore={Math.round(startSec * fps)}>
        <Story {...p} corner={brand.partLabel(p.part, p.parts.length)} />
      </Sequence>
    </AbsoluteFill>
  );
};
