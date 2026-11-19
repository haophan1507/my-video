import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/BeVietnamPro';
import {brand} from './brand';

export const {fontFamily} = loadFont('normal', {weights: ['600', '800'], subsets: ['vietnamese', 'latin']});
export const ACCENT = brand.accent; // màu nhấn của kênh, đặt ở channel/channel.json
export const SAFE = {top: 220, bottom: 520, left: 80, right: 160}; // px trên khung 1080×1920


export const TitleCard = ({text, durationInFrames}: {text: string; durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [0, 10], [24, 0], {extrapolateRight: 'clamp'});
  return (
    <Sequence durationInFrames={durationInFrames}>
      <AbsoluteFill style={{justifyContent: 'flex-start', paddingTop: 440, paddingLeft: SAFE.left, paddingRight: SAFE.right}}>
        <div style={{opacity: a, transform: `translateY(${y}px)`, display: 'flex', gap: 28,
                     background: 'rgba(12,12,16,0.5)', borderRadius: 36, padding: '34px 40px',
                     boxShadow: '0 10px 40px rgba(0,0,0,0.35)'}}>
          <div style={{width: 10, borderRadius: 6, background: ACCENT, flexShrink: 0}} />
          <div style={{color: '#fff', fontSize: 70, fontWeight: 800, lineHeight: 1.22, textWrap: 'balance'}}>{text}</div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export const CornerLabel = ({text}: {text: string}) => (
  <div style={{position: 'absolute', top: SAFE.top, left: SAFE.left, display: 'flex', alignItems: 'center', gap: 14,
               background: 'rgba(12,12,16,0.45)', borderRadius: 40, padding: '12px 26px 12px 20px'}}>
    <div style={{width: 18, height: 18, borderRadius: 9, background: ACCENT}} />
    <div style={{color: '#fff', fontSize: 34, fontWeight: 600}}>{text}</div>
  </div>
);

export const IntroCard = ({channel, durationInFrames}: {channel: string; durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(frame, [0, 16], [0.92, 1], {extrapolateRight: 'clamp'});
  return (
    <Sequence durationInFrames={durationInFrames}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div style={{opacity: a, transform: `scale(${s})`, textAlign: 'center', padding: '0 80px'}}>
          {brand.introLabel && <div style={{color: '#fff', fontSize: 34, fontWeight: 600, letterSpacing: 8, opacity: 0.9}}>{brand.introLabel}</div>}
          <div style={{color: '#fff', fontSize: 118, fontWeight: 800, lineHeight: 1.1, marginTop: 28,
                       textShadow: '0 6px 30px rgba(0,0,0,0.5)'}}>{channel}</div>
          <div style={{width: 160, height: 10, borderRadius: 5, background: ACCENT, margin: '36px auto 0'}} />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};
