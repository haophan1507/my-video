import {Composition, Still, staticFile, type CalculateMetadataFunction} from 'remotion';
import type {Caption} from '@remotion/captions';
import {Input, ALL_FORMATS, UrlSource} from 'mediabunny';
import {Story} from './Story';
import {Clip} from './Clip';
import {Backdrop, Thumbnail, TikTokCover} from './Thumbnail';
import {Overlay} from './ui';
import {partRange, type EpisodeProps, type FootageItem} from './types';
import {validateEpisode} from './validate';

export const FPS = 30;
// YouTube: khung ngang 16:9. TikTok: khung dọc 9:16. Ảnh bìa YouTube 1280×720.
export const YOUTUBE = {width: 1920, height: 1080};
export const TIKTOK = {width: 1080, height: 1920};

const audioSeconds = (src: string) =>
  new Input({formats: ALL_FORMATS, source: new UrlSource(src)}).computeDuration();
const getJson = async <T,>(p: string): Promise<T> => {
  const r = await fetch(staticFile(p));
  if (!r.ok) throw new Error(`Không tải được ${p} (HTTP ${r.status}). Đã chạy build-audio / prep-footage chưa?`);
  return r.json();
};

const loadEpisode: CalculateMetadataFunction<EpisodeProps> = async ({props}) => {
  const errors = validateEpisode(props);
  if (errors.length) throw new Error(`episode.json chưa hợp lệ:\n- ${errors.join('\n- ')}`);
  const [audioSec, manifest, captions] = await Promise.all([
    audioSeconds(staticFile(props.audioSrc)),
    getJson<FootageItem[]>('footage/manifest.json'),
    props.captionsSrc ? getJson<Caption[]>(props.captionsSrc) : Promise.resolve([] as Caption[]),
  ]);
  // Footage khác nhau theo máy: public/footage/choices.json (cục bộ) thắng footageTag trong episode.json
  const choices: Record<string, string> = await fetch(staticFile('footage/choices.json')).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  const footageTag = choices[props.audioSrc.split('/')[0]] ?? props.footageTag;
  const tags: Record<string, {speed?: number; start?: number}> = await fetch(staticFile('footage/tags.json')).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  const footage = manifest.filter((f) => f.tag === footageTag).map((f) => ({...f, speed: tags[footageTag]?.speed ?? 1, start: tags[footageTag]?.start ?? 0}));
  if (!footage.length) throw new Error(`Không có footage cho tag "${footageTag}" trên máy này. Tag đang có: ${[...new Set(manifest.map((f) => f.tag))].join(', ') || '(trống)'}. Chạy node scripts/footage-pick.mjs <mã tập> <tag>`);
  const full = {...props, footageTag, audioSec, footage, captions};
  const {startSec, endSec} = partRange(full);
  const tail = props.part ? 0 : FPS;
  return {props: full, durationInFrames: Math.ceil((endSec - startSec) * FPS) + tail};
};

const defaults: EpisodeProps = {
  title: 'Tiêu đề tập',
  audioSrc: 'xx000/audio.mp3', captionsSrc: '', footageTag: 'craft',
  dim: 0.15,
  chapters: [{title: 'Chương 1', startSec: 0}], parts: [{chapters: [1], hook: 'Hook phần 1'}],
  thumbText: 'Tiêu đề bìa', thumbBg: 'xx000/thumb-bg.jpg',
  part: 0, introSec: 0, audioSec: 0, footage: [], captions: [],
};

export const Root = () => (
  <>
    <Composition id="Episode" component={Story} fps={FPS} {...YOUTUBE}
      durationInFrames={FPS * 60} defaultProps={defaults} calculateMetadata={loadEpisode} />
    <Composition id="Clip" component={Clip} fps={FPS} {...TIKTOK}
      durationInFrames={FPS * 60} defaultProps={{...defaults, part: 1}} calculateMetadata={loadEpisode} />
    <Still id="Thumbnail" component={Thumbnail} width={1280} height={720} defaultProps={defaults} />
    <Still id="TikTokCover" component={TikTokCover} {...TIKTOK} defaultProps={{...defaults, part: 1}} />
    <Still id="BackdropYoutube" component={Backdrop} {...YOUTUBE} defaultProps={{portrait: false}} />
    <Still id="BackdropTiktok" component={Backdrop} {...TIKTOK} defaultProps={{portrait: true}} />
    <Still id="OverlayYoutube" component={Overlay} {...YOUTUBE} defaultProps={{part: 0, total: 0}} />
    <Still id="OverlayTiktok" component={Overlay} {...TIKTOK} defaultProps={{part: 1, total: 3}} />
  </>
);
