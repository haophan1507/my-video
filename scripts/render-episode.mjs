// node scripts/render-episode.mjs tc005 [--only=youtube|tiktok|cover|thumb] [--parts=1,3]
//   youtube.mp4    khung ngang 1920×1080 (composition Episode): câu chào bằng giọng, watermark logo
//   tiktok-NN.mp4  khung dọc 1080×1920 (composition Clip), mỗi phần render riêng, watermark + nhãn "Phần n/N"
//   tiktok-NN-cover.png  bìa phần TikTok 1080×1920 (render cùng phần, hoặc riêng bằng --only=cover)
//   thumb.png      ảnh bìa YouTube 1280×720
//   --only=...     chỉ render bản YouTube, các phần TikTok (kèm bìa), chỉ bìa TikTok, hoặc ảnh bìa YouTube
//   --parts=1,3    chỉ render các phần TikTok này (mặc định: mọi phần)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {epPaths, ROOT} from './lib/paths.mjs';
import {validateEpisode} from '../src/validate.ts';

const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const E = epPaths(argv[0]);
const only = flag('only');
const parts = flag('parts')?.split(',').map(Number);
const fail = (msg) => { console.error(msg); process.exit(1); };

if (argv.includes('--cut')) fail('--cut đã bỏ: bản YouTube là khung ngang nên không cắt ra phần TikTok dọc được. Dùng --parts=1,3 để render bớt.');
if (only && !['youtube', 'tiktok', 'cover', 'thumb'].includes(only)) fail(`--only phải là youtube, tiktok, cover hoặc thumb (nhận: ${only})`);
if (parts?.some((n) => !Number.isInteger(n))) fail(`--parts phải là danh sách số, ví dụ --parts=1,3 (nhận: ${flag('parts')})`);

const base = JSON.parse(fs.readFileSync(E.json, 'utf8'));
// Bìa không cần mốc chương: render thumb khi chưa có audio thì bỏ lỗi startSec.
const errors = validateEpisode(base, {needThumb: !only || ['thumb', 'tiktok', 'cover'].includes(only)})
  .filter((e) => !(only === 'thumb' && /startSec|audioSrc/.test(e)));
if (errors.length) fail(`${E.json} chưa hợp lệ:\n- ${errors.join('\n- ')}`);
if (parts?.some((n) => n < 1 || n > base.parts.length)) fail(`--parts ngoài khoảng 1–${base.parts.length}`);

const outDir = E.out;
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src', 'index.ts')});
const concurrency = Math.max(1, Math.floor(os.cpus().length / 2));

const video = async (id, inputProps, file) => {
  const composition = await selectComposition({serveUrl, id, inputProps});
  await renderMedia({
    composition, serveUrl, inputProps, codec: 'h264', concurrency,
    outputLocation: `${outDir}/${file}`,
    onProgress: ({progress}) => process.stdout.write(`\r${file} ${(progress * 100).toFixed(1)}%`),
  });
  console.log();
};


if (!only || only === 'youtube') await video('Episode', {...base, part: 0}, 'youtube.mp4');
if (!only || only === 'tiktok' || only === 'cover') {
  for (let n = 1; n <= base.parts.length; n++) {
    if (parts && !parts.includes(n)) continue;
    const nn = String(n).padStart(2, '0');
    const props = {...base, part: n};
    if (only !== 'cover') await video('Clip', props, `tiktok-${nn}.mp4`);
    const composition = await selectComposition({serveUrl, id: 'TikTokCover', inputProps: props});
    await renderStill({composition, serveUrl, inputProps: props, output: `${outDir}/tiktok-${nn}-cover.png`});
    console.log(`tiktok-${nn}-cover.png`);
  }
}
if (!only || only === 'thumb') {
  // thumb.png từ thumbText/thumbBg; thumb-2.png, thumb-3.png... từ thumbAlt[] (mỗi mục ghi đè vài trường) để A/B test
  const variants = [base, ...(base.thumbAlt ?? []).map((v) => ({...base, ...v}))];
  for (const [i, props] of variants.entries()) {
    const file = i === 0 ? 'thumb.png' : `thumb-${i + 1}.png`;
    const composition = await selectComposition({serveUrl, id: 'Thumbnail', inputProps: props});
    await renderStill({composition, serveUrl, inputProps: props, output: `${outDir}/${file}`});
    console.log(file);
  }
}
