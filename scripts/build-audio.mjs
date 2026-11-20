// node scripts/build-audio.mjs tc005 — ghép audio chương, điền startSec, in timestamp YouTube
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {epPaths, CHANNEL, channelName, chapterLabel} from './lib/paths.mjs';

const E = epPaths(process.argv[2]);
const GAP = 0.8;
const src = E.audio, tmp = E.tmp, out = E.out;
for (const d of [tmp, out, E.pub]) fs.mkdirSync(d, {recursive: true});

const ff = (...a) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...a]);
const dur = (f) => Number(execFileSync('ffprobe',
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const ts = (s) => {
  const t = Math.floor(s), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60);
  const mm = String(m).padStart(2, '0'), ss = String(t % 60).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const files = fs.readdirSync(src).filter((f) => /^ch\d+\.(mp3|wav|m4a)$/.test(f)).sort();
ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP), `${tmp}/gap.wav`);

const epFile = E.json;
const data = JSON.parse(fs.readFileSync(epFile, 'utf8'));
const INTRO = path.join(CHANNEL, 'intro.mp3'); // câu chào kênh dùng chung, đặt trước chương 1
const list = [], starts = [];
let t = 0;
if (data.intro !== false && fs.existsSync(INTRO)) {
  ff('-i', INTRO, '-ar', '44100', '-ac', '1', `${tmp}/intro.wav`);
  list.push(`file '${tmp}/intro.wav'`);
  const introDur = dur(`${tmp}/intro.wav`);
  const gap = 0.8; // nghỉ ngắn sau câu chào rồi vào truyện (nghỉ dài làm người xem sốt ruột)
  ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(gap), `${tmp}/introgap.wav`);
  list.push(`file '${tmp}/introgap.wav'`);
  t = introDur + gap;
}
data.introSec = Math.round(t * 100) / 100;
data.episodeLabel = channelName(); // nhãn góc và thẻ chào = tên kênh
data.audioSrc = `${E.pubRel}/audio.mp3`;
data.thumbBg ??= `${E.pubRel}/thumb-bg.jpg`;
files.forEach((f, i) => {
  const wav = `${tmp}/ch${i + 1}.wav`;
  ff('-i', `${src}/${f}`, '-ar', '44100', '-ac', '1', wav);
  starts.push(Math.round(t * 100) / 100);
  list.push(`file '${wav}'`);
  t += dur(wav);
  if (i < files.length - 1) { list.push(`file '${tmp}/gap.wav'`); t += GAP; }
});
fs.writeFileSync(`${tmp}/list.txt`, list.join('\n'));
ff('-f', 'concat', '-safe', '0', '-i', `${tmp}/list.txt`, '-c:a', 'libmp3lame', '-b:a', '128k', `${E.pub}/audio.mp3`);

data.chapters = starts.map((s, i) => ({title: data.chapters?.[i]?.title ?? chapterLabel(i + 1), startSec: s}));
fs.writeFileSync(epFile, JSON.stringify(data, null, 2));
fs.writeFileSync(`${out}/chapters.txt`, data.chapters.map((c, i) => `${ts(i === 0 ? 0 : c.startSec)} ${c.title}`).join('\n') + '\n');
console.log(`${files.length} chương, ${ts(t)}; timestamp: ${out}/chapters.txt`);
