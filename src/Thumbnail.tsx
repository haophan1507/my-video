// Ảnh bìa. Quy tắc nội dung và cách chọn ảnh: references/dang-bai.md mục 2 (YouTube) và mục 5 (TikTok).
//   Thumbnail   1280×720: ảnh nhân vật nửa trái, mảnh giấy xé mép nửa phải mang hook in hoa.
//   TikTokCover 1080×1920: ảnh nhân vật nửa trên, mảnh giấy nửa dưới mang "PHẦN n/N" và hook của phần.
import {AbsoluteFill, Img, random, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Phudu';
import {brand} from './brand';
import type {EpisodeProps} from './types';

const {fontFamily: titleFont} = loadFont('normal', {weights: ['800'], subsets: ['vietnamese', 'latin']});

const INK = '#1C1A1F';     // màu chữ chính
const PAPER = '#F7F5F0';

// Mép giấy xé dọc theo một trục: răng cưa ngẫu nhiên cố định theo seed, hơi nghiêng.
// vertical = mép đứng tại x = pos (giấy nằm bên phải); ngược lại mép ngang tại y = pos (giấy nằm bên dưới).
const tornEdge = (W: number, H: number, pos: number, amp: number, seed: string, vertical: boolean) => {
  const len = vertical ? H : W;
  const pts: string[] = [];
  for (let t = -10, i = 0; t <= len + 10; t += 14, i++) {
    const big = random(`${seed}-b${Math.floor(i / 4)}`) * amp * 2.2;
    const tilt = (0.5 - t / len) * 36;
    const d = (pos + tilt - big - random(`${seed}-${i}`) * amp).toFixed(1);
    pts.push(vertical ? `${d},${t}` : `${t},${d}`);
  }
  const tail = vertical ? [`${W + 10},${H + 10}`, `${W + 10},-10`] : [`${W + 10},${H + 10}`, `-10,${H + 10}`];
  return [...pts, ...tail].join(' ');
};

const Paper = ({W, H, pos, vertical}: {W: number; H: number; pos: number; vertical: boolean}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx={vertical ? -8 : 0} dy={vertical ? 6 : -8} stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
      </filter>
      <radialGradient id="paper" cx="60%" cy="45%" r="75%">
        <stop offset="0%" stopColor={PAPER} />
        <stop offset="100%" stopColor="#E7E3DA" />
      </radialGradient>
    </defs>
    <polygon points={tornEdge(W, H, pos - 6, 9, 'fiber', vertical)} fill="#D9D4CA" filter="url(#shadow)" />
    <polygon points={tornEdge(W, H, pos + 8, 7, 'paper', vertical)} fill="url(#paper)" />
  </svg>
);

const Pin = ({x, y}: {x: number; y: number}) => (
  <div style={{position: 'absolute', left: x - 22, top: y, width: 44, height: 44, borderRadius: 22,
    background: `radial-gradient(circle at 35% 30%, #fff 0%, ${brand.accent} 38%, #8A1E33 100%)`,
    boxShadow: '3px 6px 8px rgba(0,0,0,0.35)'}} />
);

const Badge = ({style}: {style: React.CSSProperties}) => (
  <div style={{position: 'absolute', background: brand.accent, borderRadius: 30, padding: '8px 18px', color: '#fff',
    fontFamily: titleFont, fontWeight: 800, fontSize: 24, letterSpacing: 0.5, ...style}}>
    {brand.name.toUpperCase()}
  </div>
);

// "HOOK *NHẤN* | DÒNG 2": "|" ngắt dòng, *...* đổi màu nhấn. Không có "|" thì tự ngắt theo maxChars ký tự mỗi dòng.
type Seg = {t: string; hi: boolean};
const parseLines = (text: string, maxChars: number): Seg[][] => {
  const raw = text.toUpperCase();
  const rows = raw.includes('|') ? raw.split('|') : raw.split(/\s+/).reduce<string[]>((acc, w) => {
    const last = acc[acc.length - 1];
    if (last !== undefined && (last + ' ' + w).replace(/\*/g, '').length <= maxChars) acc[acc.length - 1] = `${last} ${w}`;
    else acc.push(w);
    return acc;
  }, []);
  return rows.map((line) => line.trim().split(/(\*[^*]+\*)/).filter(Boolean)
    .map((s) => (s.startsWith('*') && s.endsWith('*') ? {t: s.slice(1, -1), hi: true} : {t: s.replace(/\*/g, ''), hi: false})));
};

// Khối chữ hook căn giữa, cỡ chữ lớn nhất vừa khung (chữ in hoa Phudu ~0,5em bề ngang)
const Hook = ({lines, box, maxFont}: {lines: Seg[][]; box: {left: number; top: number; width: number; height: number}; maxFont: number}) => {
  const longest = Math.max(...lines.map((l) => l.reduce((n, s) => n + s.t.length, 0)));
  const fontSize = Math.round(Math.min(maxFont, box.width / (longest * 0.5), box.height / (lines.length * 1.08)));
  return (
    <div style={{position: 'absolute', ...box, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', textAlign: 'center', fontFamily: titleFont, fontWeight: 800, fontSize, lineHeight: 1.08, color: INK}}>
      {lines.map((l, i) => (
        <div key={i} style={{whiteSpace: 'nowrap'}}>
          {l.map((s, k) => <span key={k} style={s.hi ? {color: brand.accent} : undefined}>{s.t}</span>)}
        </div>
      ))}
    </div>
  );
};

export const Thumbnail = (p: EpisodeProps) => {
  const W = 1280, H = 720, X = 0.52 * W; // X: mép xé
  const panelW = W - X - 90;
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img src={staticFile(p.thumbBg)} style={{position: 'absolute', left: 0, top: 0, width: X + 140, height: H,
        objectFit: 'cover', objectPosition: p.thumbFocus || '50% 30%'}} />
      <Paper W={W} H={H} pos={X} vertical />
      <Pin x={X + 30 + panelW / 2 + 15} y={46} />
      <Badge style={{right: 28, top: 26}} />
      <Hook lines={parseLines(p.thumbText, 16)} box={{left: X + 30, width: panelW + 30, top: 110, height: 470}} maxFont={104} />
      {p.thumbTag ? (
        <div style={{position: 'absolute', left: X + 30, width: panelW + 30, top: 612, textAlign: 'center',
          fontFamily: titleFont, fontWeight: 800, fontSize: 30, letterSpacing: 2, color: brand.accent}}>
          {p.thumbTag.toUpperCase()}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// Bìa phần TikTok. Lưới hồ sơ TikTok cắt bìa còn khoảng 3:4 giữa khung (y ~240–1680), nên mọi chữ nằm trong dải đó.
export const TikTokCover = (p: EpisodeProps) => {
  const W = 1080, H = 1920, Y = 1000; // Y: mép xé
  const part = p.parts[Math.max(1, p.part) - 1];
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img src={staticFile(p.thumbBg)} style={{position: 'absolute', left: 0, top: 0, width: W, height: Y + 140,
        objectFit: 'cover', objectPosition: p.coverFocus || p.thumbFocus || '50% 30%'}} />
      <Paper W={W} H={H} pos={Y} vertical={false} />
      <Pin x={W / 2} y={Y + 40} />
      <Badge style={{left: 60, top: 270}} />
      <div style={{position: 'absolute', left: 0, width: W, top: Y + 105, textAlign: 'center', fontFamily: titleFont,
        fontWeight: 800, fontSize: 64, letterSpacing: 3, color: brand.accent}}>
        {brand.partLabel(Math.max(1, p.part), p.parts.length).toUpperCase()}
      </div>
      <Hook lines={parseLines(part.hook, 15)} box={{left: 70, width: W - 140, top: Y + 200, height: 450}} maxFont={110} />
    </AbsoluteFill>
  );
};
