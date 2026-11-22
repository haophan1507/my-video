// Ảnh bìa. Quy tắc nội dung và cách chọn ảnh: references/dang-bai.md mục 2 (YouTube) và mục 5 (TikTok).
//   Thumbnail   1280×720: nền kem; cột trái logo kênh, hook in hoa, nút Subscribe; ảnh nhân vật trong khung tròn (~42% bề ngang) tràn mép phải.
//   TikTokCover 1080×1920: cùng mẫu khung dọc: logo, nhãn "PHẦN n/N", hook phần ở trên; ảnh trong vòm tròn phủ kín phần dưới.
import {AbsoluteFill, Img, random, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/PaytoneOne';
import {brand} from './brand';
import type {EpisodeProps} from './types';

const {fontFamily: titleFont} = loadFont('normal', {weights: ['400'], subsets: ['vietnamese', 'latin']});

// Chữ hook một màu nâu đậm; chỉ cụm *từ khóa gây sốc* đổi sang đỏ quýt.
const HOOK_COLOR = '#3B1F10';
const HI_COLOR = '#E2452E';

const CREAM = 'radial-gradient(circle at 62% 45%, #FFF6E3 0%, #FFE9C2 100%)';

// Cọ khô vẽ tay kiểu lông cọ: mỗi nét gồm nhiều sợi lông chạy song song dọc một đường tâm. Sợi ở giữa dài, sợi ở mép ngắn
// (đầu nét tròn tự nhiên), về cuối nét mực cạn nên sợi đứt quãng nhiều hơn; mép được làm nhòe bằng bộ lọc nhiễu (feTurbulence).
// Mọi chỗ ngẫu nhiên cố định theo seed (random của Remotion) nên render lại vẫn y như cũ.
type Pt = [number, number];
const wave = (u: number, seed: string, n = 3) =>   // nhiễu mượt trong [-1, 1]: tổng vài sóng sin lệch pha
  Array.from({length: n}, (_, k) => Math.sin(2 * Math.PI * (k + 1) * 0.9 * u + random(`${seed}-p${k}`) * 6.28) / (k + 1)).reduce((a, b) => a + b, 0) / 1.5;
const pts2 = (a: Pt[]) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

const BRUSH_COLORS = ['#F7961F', '#F9A640', '#F48A12', '#FBB25A'];

// path(u), u ∈ [0, 1]: đường tâm nét; w: bề rộng nét; dry: 0 = đặc, 1 = rất khô (nhiều đứt quãng); colors: các sắc độ trộn giữa các sợi.
const Brush = ({path, w, seed, dry = 0.5, colors = BRUSH_COLORS, op = 1}:
  {path: (u: number) => Pt; w: number; seed: string; dry?: number; colors?: string[]; op?: number}) => {
  const B = Math.max(10, Math.round(w / 1.6)), N = 120;
  const pos: Pt[] = [], nor: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N, [x, y] = path(u), [x2, y2] = path(Math.min(1, u + 0.002)), [x1, y1] = path(Math.max(0, u - 0.002));
    const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1;
    pos.push([x, y]); nor.push([-dy / l, dx / l]);
  }
  const lines: React.ReactNode[] = [];
  for (let j = 0; j < B; j++) {
    const r = (k: string) => random(`${seed}-${j}-${k}`);
    const off = ((j + 0.5) / B - 0.5) * w + (r('o') - 0.5) * 1.5;
    const edge = Math.abs(off) / (w / 2);                         // 0 giữa nét, 1 mép nét
    const u0 = 0.02 + 0.16 * (Math.pow(edge, 2) * 0.7 + r('s') * 0.5);
    const u1 = 1 - 0.3 * (Math.pow(edge, 1.5) * 0.6 + r('e') * 0.7);
    const sw = (w / B) * (1.6 + r('w') * 1.4), color = colors[Math.floor(r('c') * colors.length)], o = 0.55 + r('a') * 0.45;
    let seg: Pt[] = [], k = 0;
    const flush = () => { if (seg.length > 1) lines.push(<polyline key={`${j}-${k++}`} points={pts2(seg)} fill="none" stroke={color}
      strokeWidth={sw} strokeLinecap="round" opacity={o} />); seg = []; };
    for (let i = Math.ceil(u0 * N); i <= Math.floor(u1 * N); i++) {
      const u = i / N, d = off + wave(u, `${seed}-${j}`, 2) * 0.8;
      // mực cạn dần: xác suất đứt tăng theo u và theo mép nét
      const gap = random(`${seed}-g${j}-${Math.floor(i / 5)}`) < dry * (0.08 + 0.55 * Math.pow(u, 2.2) + 0.25 * edge);
      if (gap) flush(); else seg.push([pos[i][0] + nor[i][0] * d, pos[i][1] + nor[i][1] * d]);
    }
    flush();
  }
  return (
    <g opacity={op} filter="url(#rough)">
      {lines}
    </g>
  );
};

// Bộ lọc làm nhòe mép nét cọ (khai báo một lần trong mỗi svg có Brush)
const RoughDefs = () => (
  <defs>
    <filter id="rough" x="-5%" y="-20%" width="110%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves={2} seed={7} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={5} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

// Đường tâm cung tròn quanh (cx, cy) bán kính rad, từ góc a0 tới a1 (độ, 0 = đông, theo chiều kim đồng hồ)
const arc = (cx: number, cy: number, rad: number, a0: number, a1: number, wob = 3, seed = 'arc') => (u: number): Pt => {
  const a = ((a0 + (a1 - a0) * u) * Math.PI) / 180, rr = rad + wave(u, seed) * wob;
  return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
};

// Viền cọ quanh khung tròn: một nét chính ôm sát mép ảnh phía `facing` + một nét mảnh khô hơn lệch ra ngoài.
const BrushRing = ({cx, cy, r, facing, span = 150}: {cx: number; cy: number; r: number; facing: number; span?: number}) => (
  <>
    <Brush path={arc(cx, cy, r + 10, facing - span / 2, facing + span / 2, 4, 'r1')} w={34} seed="ring" dry={0.45} />
    <Brush path={arc(cx, cy, r + 36, facing - span * 0.32, facing + span * 0.22, 6, 'r2')} w={10} seed="ring2" dry={0.8}
      colors={['#F9A640', '#FBB25A']} op={0.85} />
  </>
);

// Dải cọ ngang khô (quẹt một lần): một mảng đặc thon dần về cuối, khoét sọc bằng nhiễu kéo dài theo chiều ngang
// (feTurbulence tần số ngang thấp, dọc cao = vệt lông cọ), mép gồ ghề bằng feDisplacementMap. Độ đậm của mảng giảm dần ở hai đầu
// nên ở đó chỉ còn các sọc mạnh nhất lọt qua: đầu nét khô, xơ tự nhiên.
const BrushBar = ({x, y, w, h, seed}: {x: number; y: number; w: number; h: number; seed: string}) => {
  const N = 90, top: Pt[] = [], bot: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N, xx = x + w * u;
    const prof = Math.min(1, Math.pow(u / 0.05, 0.6)) * (1 - 0.45 * Math.pow(u, 1.8)); // đầu tù, thon dần về cuối
    const mid = y + h / 2 + wave(u, `${seed}m`) * h * 0.08 + (u - 0.5) * h * 0.12;
    const half = (h / 2) * prof;
    top.push([xx, mid - half * (0.85 + 0.15 * wave(u, `${seed}t`, 2))]);
    bot.push([xx, mid + half * (0.85 + 0.15 * wave(u, `${seed}b`, 2))]);
  }
  const sd = Math.floor(random(seed) * 1000);
  return (
    <>
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F4A646" stopOpacity={0.85} />
          <stop offset="0.12" stopColor="#F6B05A" stopOpacity={1} />
          <stop offset="0.65" stopColor="#F8BC6E" stopOpacity={1} />
          <stop offset="1" stopColor="#F9C47E" stopOpacity={0.7} />
        </linearGradient>
        <filter id={`f-${seed}`} x="-5%" y="-40%" width="110%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={`${(2 / w).toFixed(4)} ${(18 / h).toFixed(3)}`} numOctaves={3} seed={sd} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="na" />
          <feComposite in="SourceAlpha" in2="na" operator="arithmetic" k1={0} k2={5} k3={6} k4={-7.1} result="m" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.12" numOctaves={2} seed={sd + 1} result="n2" />
          <feDisplacementMap in="m" in2="n2" scale={Math.round(h * 0.14)} xChannelSelector="R" yChannelSelector="G" result="m2" />
          <feComposite in="SourceGraphic" in2="m2" operator="in" />
        </filter>
      </defs>
      <polygon points={pts2([...top, ...bot.reverse()])} fill={`url(#g-${seed})`} filter={`url(#f-${seed})`} />
    </>
  );
};

// Neo mặt: `face` = vị trí mặt trong ảnh ("55% 33%"), ảnh rộng `zoom` × đường kính khung, mặt đặt đúng điểm `at`
// (tọa độ trong khung, px) = giữa phần khung tròn nhìn thấy. Không có `face` thì dùng objectFit cover + `focus`.
type Anchor = {face?: string; zoom: number; at: [number, number]};
const RoundPhoto = ({src, focus, cx, cy, r, facing, span, anchor}: {src: string; focus: string; cx: number; cy: number; r: number; facing: number; span?: number; anchor?: Anchor}) => {
  const [fx, fy] = (anchor?.face ?? '').split(/\s+/).map((v) => parseFloat(v));
  const anchored = anchor && Number.isFinite(fx) && Number.isFinite(fy);
  return (
  <>
    <div style={{position: 'absolute', left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: '50%', overflow: 'hidden'}}>
      {anchored
        ? <Img src={staticFile(src)} style={{position: 'absolute', left: anchor.at[0], top: anchor.at[1], width: 2 * r * anchor.zoom,
          height: 'auto', maxWidth: 'none', transform: `translate(-${fx}%, -${fy}%)`}} />
        : <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus}} />}
    </div>
    <svg width="100%" height="100%" style={{position: 'absolute', left: 0, top: 0}}>
      <RoughDefs />
      <BrushRing cx={cx} cy={cy} r={r} facing={facing} span={span} />
    </svg>
  </>
  );
};

// Các dải cọ nền (trong một svg toàn khung)
const Bars = ({bars}: {bars: {x: number; y: number; w: number; h: number}[]}) => (
  <svg width="100%" height="100%" style={{position: 'absolute', left: 0, top: 0}}>
    <RoughDefs />
    {bars.map((b, i) => <BrushBar key={i} {...b} seed={`bar${i}`} />)}
  </svg>
);

// "HOOK *NHẤN* | DÒNG 2": "|" ngắt dòng, *...* đổi màu nhấn. Không có "|" thì tự ngắt theo maxChars ký tự mỗi dòng.
type Seg = {t: string; hi: boolean};
const parseLines = (text: string, maxChars: number): Seg[][] => {
  const raw = text.toUpperCase();
  if (raw.includes('|')) {
    // Ngắt tay: mỗi dòng tự chứa các cụm *nhấn*
    return raw.split('|').map((line) => line.trim().split(/(\*[^*]+\*)/).filter(Boolean)
      .map((s) => (s.startsWith('*') && s.endsWith('*') ? {t: s.slice(1, -1), hi: true} : {t: s.replace(/\*/g, ''), hi: false})));
  }
  // Tự ngắt: tách từng từ kèm cờ nhấn (cụm *nhấn* có thể nhiều từ và rơi qua nhiều dòng), rồi gom dòng theo số ký tự.
  let inHi = false;
  const words = raw.split(/\s+/).filter(Boolean).map((w) => {
    const before = inHi, stars = (w.match(/\*/g) ?? []).length;
    if (stars % 2) inHi = !inHi;
    return {t: w.replace(/\*/g, ''), hi: before || stars > 0};
  }).filter((w) => w.t);
  const lines: {t: string; hi: boolean}[][] = [];
  let len = 0;
  for (const w of words) {
    if (lines.length && len + 1 + w.t.length <= maxChars) { lines[lines.length - 1].push(w); len += 1 + w.t.length; }
    else { lines.push([w]); len = w.t.length; }
  }
  return lines.map((ws) => ws.reduce<Seg[]>((segs, w, i) => {
    const t = (i ? ' ' : '') + w.t, last = segs[segs.length - 1];
    if (last && last.hi === w.hi) last.t += t;
    else segs.push({t: last ? ' ' + w.t : w.t, hi: w.hi}); // khoảng trắng nằm ở đầu đoạn sau
    return segs;
  }, []));
};

// Cỡ chữ lớn nhất vừa khung (chữ in hoa Paytone One ~0,6em bề ngang tính cả dấu cách, dòng cao LINE_H em).
// Dòng 1,5em: chữ in hoa tiếng Việt có dấu chồng (Ổ, Ộ) ở 1,15em và 1,3em thì dấu dòng dưới chạm dấu nặng dòng trên (ts001, 2026-11-22, xem bản gốc phóng to).
const LINE_H = 1.5;
type Box = {left: number; top: number; width: number; height: number};
const fontFor = (lines: Seg[][], box: Box, maxFont: number) => {
  const longest = Math.max(...lines.map((l) => l.reduce((n, s) => n + s.t.length, 0)));
  return Math.round(Math.min(maxFont, box.width / (longest * 0.6), box.height / (lines.length * LINE_H)));
};

// Chữ hook không có "|": thử mọi độ rộng dòng 6–40 ký tự, lấy cách ngắt cho cỡ chữ lớn nhất (bằng nhau thì ít dòng hơn).
// Có "|": giữ nguyên cách ngắt thủ công.
const fitLines = (text: string, box: Box, maxFont: number): Seg[][] => {
  if (text.includes('|')) return parseLines(text, 99);
  let best = parseLines(text, 99), bestFont = fontFor(best, box, maxFont);
  for (let n = 6; n <= 40; n++) {
    const l = parseLines(text, n), f = fontFor(l, box, maxFont);
    if (f > bestFont || (f === bestFont && l.length < best.length)) { best = l; bestFont = f; }
  }
  return best;
};

// Khối chữ hook căn giữa, cỡ chữ lớn nhất vừa khung
const Hook = ({text, box, maxFont}: {text: string; box: Box; maxFont: number}) => {
  const lines = fitLines(text, box, maxFont);
  const fontSize = fontFor(lines, box, maxFont);
  return (
    <div style={{position: 'absolute', ...box, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', textAlign: 'center', fontFamily: titleFont, fontSize, lineHeight: LINE_H}}>
      {lines.map((l, i) => (
        <div key={i} style={{whiteSpace: 'nowrap', color: HOOK_COLOR}}>
          {l.map((s, k) => <span key={k} style={s.hi ? {color: HI_COLOR} : undefined}>{s.t}</span>)}
        </div>
      ))}
    </div>
  );
};

// Logo kênh (brand.watermark, ảnh logo kèm tên kênh), viền trắng mờ quanh hình để nổi trên nền kem.
const Logo = ({cx, top, h}: {cx: number; top: number; h: number}) => (
  <Img src={staticFile(brand.watermark)} style={{position: 'absolute', left: cx - h * 0.75, width: h * 1.5, top, height: h,
    objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(120,60,10,0.25))'}} />
);

// Ngón tay trỏ (con trỏ chuột kiểu bàn tay) màu trắng viền nâu, đầu ngón ở (x, y).
const Hand = ({x, y, s}: {x: number; y: number; s: number}) => (
  <svg width={60 * s} height={70 * s} viewBox="0 0 60 70" style={{position: 'absolute', left: x - 18 * s, top: y - 2 * s}}>
    <path d="M18 4c3.3 0 6 2.7 6 6v20l4-1c2.6-.6 5 .9 5.6 3.3l5.4-1.1c2.7-.5 5.2 1.2 5.6 3.8l3.9-.6c2.8-.4 5.4 1.6 5.6 4.4.6 8.2-1.2 16.2-6 22.6L45 66H20l-9-15-6.5-9.4c-1.6-2.4-1-5.6 1.4-7.2 2.2-1.5 5.1-1 6.8 1L12 35V10c0-3.3 2.7-6 6-6z"
      fill="#fff" stroke="#3B1F10" strokeWidth={3.5} strokeLinejoin="round" />
    <path d="M24 30v12M33.6 31v11M43 34v9" stroke="#3B1F10" strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

// Nút đỏ chữ trắng kiểu nút Subscribe, có ngón tay bấm vào góc phải.
const RedButton = ({label, cx, top, h, hand = true}: {label: string; cx: number; top: number; h: number; hand?: boolean}) => {
  const fs = h * 0.5, w = label.length * fs * 0.68 + h * 0.9;
  return (
    <>
      <div style={{position: 'absolute', left: cx - w / 2, top, width: w, height: h, borderRadius: h * 0.28,
        background: 'linear-gradient(#F23B30, #C8150F)', border: `${Math.round(h * 0.06)}px solid #fff`,
        boxShadow: '0 6px 12px rgba(120,20,10,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: titleFont, fontSize: fs, letterSpacing: 1.5}}>
        {label.toUpperCase()}
      </div>
      {hand ? <Hand x={cx + w * 0.3} y={top + h * 0.55} s={h / 60} /> : null}
    </>
  );
};

// Hình vẽ mờ trên nền kem: vòng tròn, chấm, nốt nhạc, tai nghe (chủ đề audio). Vị trí cố định theo seed.
const Note = ({x, y, s, rot}: {x: number; y: number; s: number; rot: number}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill="none" stroke="#F2A24A" strokeWidth={3} strokeLinecap="round">
    <ellipse cx={-8} cy={22} rx={7} ry={5.5} fill="#F2A24A" /><ellipse cx={18} cy={18} rx={7} ry={5.5} fill="#F2A24A" />
    <path d="M-1.5 21V-6l26-5v28" /><path d="M-1.5 1l26-5" />
  </g>
);
const Phones = ({x, y, s, rot}: {x: number; y: number; s: number; rot: number}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill="none" stroke="#F2A24A" strokeWidth={3} strokeLinecap="round">
    <path d="M-20 10v-6a20 20 0 0 1 40 0v6" /><rect x={-25} y={6} width={10} height={16} rx={4} /><rect x={15} y={6} width={10} height={16} rx={4} />
  </g>
);
const Doodles = ({W, H, n, seed, avoid}: {W: number; H: number; n: number; seed: string; avoid: (x: number, y: number) => boolean}) => {
  const items: React.ReactNode[] = [];
  for (let i = 0, k = 0; i < n * 6 && items.length < n; i++) {
    const x = 30 + random(`${seed}x${i}`) * (W - 60), y = 30 + random(`${seed}y${i}`) * (H - 60);
    if (avoid(x, y)) continue;
    const kind = k++ % 4, s = 0.7 + random(`${seed}s${i}`) * 0.6, rot = (random(`${seed}r${i}`) - 0.5) * 50;
    items.push(kind === 0 ? <circle key={i} cx={x} cy={y} r={10 * s} fill="none" stroke="#F2A24A" strokeWidth={3} />
      : kind === 1 ? <Note key={i} x={x} y={y} s={s} rot={rot} />
      : kind === 2 ? <circle key={i} cx={x} cy={y} r={5 * s} fill="#F2A24A" />
      : <Phones key={i} x={x} y={y} s={s} rot={rot} />);
  }
  return <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, opacity: 0.45}}>{items}</svg>;
};

const Tag = ({text, left, width, top, size}: {text?: string; left: number; width: number; top: number; size: number}) =>
  text ? (
    <div style={{position: 'absolute', left, width, top, textAlign: 'center', fontFamily: titleFont, fontSize: size,
      letterSpacing: 2, color: brand.accent}}>{text.toUpperCase()}</div>
  ) : null;

// Nền sau footage khi clip không phủ kín khung (clip dọc trên khung ngang YouTube, clip vuông/ngang trên khung dọc TikTok):
// nền kem + hình vẽ mờ cùng mẫu ảnh bìa, thay cho viền đen. Hình vẽ chỉ nằm ngoài vùng giữa khung (nơi footage hiện).
export const Backdrop = ({portrait}: {portrait: boolean}) => {
  const W = portrait ? 1080 : 1920, H = portrait ? 1920 : 1080;
  const avoid = (x: number, y: number) => portrait
    ? (y > 380 && y < 1540) || (x < 520 && y < 420)
    : Math.abs(x - W / 2) < 340 || (x < 330 && y < 260);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: CREAM}} />
      <Doodles W={W} H={H} n={portrait ? 20 : 26} seed={portrait ? 'bdt' : 'bdy'} avoid={avoid} />
    </AbsoluteFill>
  );
};

export const Thumbnail = (p: EpisodeProps) => {
  const W = 1280, H = 720;
  const cx = 1250, cy = 360, r = 520;          // khung tròn ảnh: mép trái x = 730 (~43% bề ngang), phủ kín mép phải, trên, dưới
  const TX = 30, TW = 670, mid = TX + TW / 2; // cột chữ (~55%)
  const avoid = (x: number, y: number) => Math.hypot(x - cx, y - cy) < r + 70
    || (x > TX + 30 && x < TX + TW - 30 && y > 30 && y < 690); // hình vẽ chỉ ở viền cột chữ, không đè chữ và ảnh
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: CREAM}} />
      <Doodles W={W} H={H} n={14} seed="yt" avoid={avoid} />
      <Bars bars={[{x: 150, y: 14, w: 400, h: 42}, {x: 430, y: 666, w: 290, h: 30}]} />
      {/* phần nhìn thấy của khung: x 730–1280, y 0–720 → mặt đặt ở (1000, 330) trên khung hình */}
      <RoundPhoto src={p.thumbBg} focus={p.thumbFocus || '50% 30%'} cx={cx} cy={cy} r={r} facing={180} span={110}
        anchor={{face: p.thumbFace, zoom: p.thumbZoom ?? 1, at: [1000 - (cx - r), 330 - (cy - r)]}} />
      <Logo cx={mid} top={36} h={150} />
      <Hook text={p.thumbText} box={{left: TX, width: TW, top: 196, height: p.thumbTag ? 320 : 350}} maxFont={110} />
      <Tag text={p.thumbTag} left={TX} width={TW} top={520} size={30} />
      <RedButton label="Subscribe" cx={mid} top={578} h={62} />
    </AbsoluteFill>
  );
};

// Bìa phần TikTok. Lưới hồ sơ TikTok cắt bìa còn khoảng 3:4 giữa khung (y ~240–1680), nên chữ và ảnh nằm trong dải đó.
export const TikTokCover = (p: EpisodeProps) => {
  const W = 1080, H = 1920;
  const cx = 540, cy = 1990, r = 900;          // khung tròn lớn dạng vòm: đỉnh y = 1090, phủ kín mép trái, phải, dưới
  const part = p.parts[Math.max(1, p.part) - 1];
  const avoid = (x: number, y: number) => Math.hypot(x - cx, y - cy) < r + 80 || (x > 60 && x < 1020 && y > 220 && y < 1040);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: CREAM}} />
      <Doodles W={W} H={H} n={18} seed="tt" avoid={avoid} />
      <Bars bars={[{x: 170, y: 175, w: 470, h: 50}]} />
      {/* phần nhìn thấy của vòm: x 0–1080, y 1090–1920 → mặt đặt ở (540, 1350) */}
      <RoundPhoto src={p.thumbBg} focus={p.coverFocus || p.thumbFocus || '50% 30%'} cx={cx} cy={cy} r={r} facing={270} span={86}
        anchor={{face: p.coverFace ?? p.thumbFace, zoom: p.coverZoom ?? 0.72, at: [540 - (cx - r), 1350 - (cy - r)]}} />
      <Logo cx={W / 2} top={240} h={200} />
      <RedButton label={brand.partLabel(Math.max(1, p.part), p.parts.length)} cx={W / 2} top={462} h={84} hand={false} />
      <Hook text={part.hook} box={{left: 70, width: W - 140, top: 575, height: 470}} maxFont={130} />
    </AbsoluteFill>
  );
};
