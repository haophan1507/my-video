import {Img, staticFile, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/BeVietnamPro';
import {brand} from './brand';

export const {fontFamily} = loadFont('normal', {weights: ['600', '800'], subsets: ['vietnamese', 'latin']});
export const ACCENT = brand.accent; // màu nhấn của kênh, đặt ở channel/channel.json

// Bố cục theo hướng khung. Dọc 1080×1920 (TikTok): chừa chỗ cho nút, caption của app ở phải và đáy.
// Ngang 1920×1080 (YouTube): chỉ chừa thanh điều khiển ở đáy và lề an toàn chung.
const PORTRAIT = {
  safe: {top: 180, bottom: 520, left: 80, right: 160},
  captionTop: 0.6, captionFont: 64,
  cornerFont: 34, watermarkH: 180, // TikTok: top 180 tránh thanh Following/For You, left 80
};
const LANDSCAPE = {
  safe: {top: 70, bottom: 120, left: 100, right: 100},
  captionTop: 0.7, captionFont: 52,
  cornerFont: 30, watermarkH: 150, // YouTube: góc phải dưới dành cho watermark kênh của YouTube
};
export type Layout = typeof PORTRAIT;
export const useLayout = (): Layout => {
  const {width, height} = useVideoConfig();
  return width > height ? LANDSCAPE : PORTRAIT;
};

// Watermark góc trên trái: logo kênh (ảnh), kèm nhãn "Phần n/N" ở bản TikTok.
export const Watermark = ({label}: {label?: string}) => {
  const L = useLayout();
  return (
    <div style={{position: 'absolute', top: L.safe.top, left: L.safe.left, display: 'flex', alignItems: 'center', gap: 20}}>
      <Img src={staticFile(brand.watermark)} style={{height: L.watermarkH, width: 'auto', opacity: 0.92,
                                                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))'}} />
      {label && (
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(12,12,16,0.45)',
                     borderRadius: 40, padding: '12px 26px 12px 20px'}}>
          <div style={{width: 18, height: 18, borderRadius: 9, background: ACCENT}} />
          <div style={{color: '#fff', fontSize: L.cornerFont, fontWeight: 600}}>{label}</div>
        </div>
      )}
    </div>
  );
};
