// Đường dẫn của một tập. Dùng: const E = epPaths(process.argv[2]);  // "tc005" hoặc "tc005-slug"
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const CHANNEL = path.join(ROOT, 'channel'); // tài sản dùng chung cả kênh (intro.tts.txt, intro.mp3)
export const FOOTAGE = path.join(ROOT, 'public', 'footage'); // <tag>/<tag>-NN.mp4, <tag>/sources.txt, manifest.json
export const TAG_RE = /^[a-z0-9-]+$/;

// Thương hiệu và chữ cố định của kênh: nguồn duy nhất là channel/channel.json (src/brand.ts đọc cùng file này).
// Chuỗi mẫu dùng {name}, {n}, {total}.
const REQUIRED = ['name', 'introText', 'introLabel', 'partLabel', 'chapterLabel', 'accent'];
export const channelConfig = () => {
  const c = JSON.parse(fs.readFileSync(path.join(CHANNEL, 'channel.json'), 'utf8'));
  const missing = REQUIRED.filter((k) => typeof c[k] !== 'string');
  if (missing.length) throw new Error(`channel/channel.json thiếu hoặc sai kiểu: ${missing.join(', ')}`);
  return c;
};
export const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
export const channelName = () => channelConfig().name;
export const introText = () => fill(channelConfig().introText, {name: channelName()}); // câu chào đọc ở đầu bản YouTube
export const chapterLabel = (n) => fill(channelConfig().chapterLabel, {n});            // tên chương mặc định

// Thể loại: stories/genres.json {mã 2 chữ: {dir, name}}. Mã truyện/tập = mã thể loại + số, ví dụ tc005.
export const GENRES = JSON.parse(fs.readFileSync(path.join(ROOT, 'stories', 'genres.json'), 'utf8'));
export const ID_RE = /^[a-z]{2}[0-9]{3,}/;

export function epPaths(arg) {
  const id = arg?.match(ID_RE)?.[0];
  if (!id) throw new Error(`Cần mã tập dạng tc005 (2 chữ thể loại + số), nhận được: ${arg ?? '(trống)'}`);
  const genre = GENRES[id.slice(0, 2)];
  if (!genre) throw new Error(`Mã thể loại "${id.slice(0, 2)}" chưa có trong stories/genres.json (có: ${Object.keys(GENRES).join(', ')})`);
  const base = path.join(ROOT, 'episodes', genre.dir);
  const name = (fs.existsSync(base) ? fs.readdirSync(base) : []).find((d) => d === id || d.startsWith(`${id}-`));
  if (!name) throw new Error(`Không có thư mục episodes/${genre.dir}/${id}-*`);
  const dir = path.join(base, name);
  return {
    id, name, dir, genre: genre.dir,
    script: path.join(dir, 'script'), // chNN.tts.txt (một file mỗi chương)
    audio: path.join(dir, 'audio'),   // chNN.mp3 từ TTS
    out: path.join(dir, 'out'),       // youtube.mp4, tiktok-NN.mp4, thumb.png, chapters.txt
    json: path.join(dir, 'episode.json'),
    pub: path.join(ROOT, 'public', id), // file sinh ra cho Remotion (audio.mp3, thumb-bg.jpg, captions.json)
    pubRel: id,                         // đường dẫn tương đối trong public/ cho staticFile
    tmp: path.join(ROOT, '.tmp', id),
  };
}
