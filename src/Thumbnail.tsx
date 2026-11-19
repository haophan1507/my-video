import {AbsoluteFill, Img, staticFile} from 'remotion';
import {fontFamily} from './ui';
import type {EpisodeProps} from './types';

export const Thumbnail = (p: EpisodeProps) => (
  <AbsoluteFill style={{backgroundColor: '#000', fontFamily}}>
    <Img src={staticFile(p.thumbBg)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.1) 75%)'}} />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 60px', width: '68%'}}>
      <div style={{color: '#fff', fontSize: 92, fontWeight: 800, lineHeight: 1.05,
                   textTransform: 'uppercase', WebkitTextStroke: '3px #000', paintOrder: 'stroke fill'}}>
        {p.thumbText}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
