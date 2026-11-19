// Thương hiệu và chữ cố định của kênh, đọc từ channel/channel.json (cùng file với scripts/lib/paths.mjs).
// Đổi ở đó, không sửa trong code. Chuỗi mẫu dùng {n} và {total}.
import channel from '../channel/channel.json';

const fill = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));

export const brand = {
  accent: channel.accent,           // màu nhấn: thanh thẻ hook, chấm nhãn góc, gạch dưới tên kênh
  introLabel: channel.introLabel,   // dòng nhỏ phía trên tên kênh ở thẻ chào ("" = không hiện)
  partLabel: (n: number, total: number) => fill(channel.partLabel, {n, total}), // nhãn góc bản TikTok
};
