import {Composition, Still, staticFile, type CalculateMetadataFunction} from 'remotion';
import type {Caption} from '@remotion/captions';
import {Input, ALL_FORMATS, UrlSource} from 'mediabunny';
import {Story} from './Story';
import {Clip} from './Clip';
import {Thumbnail} from './Thumbnail';
import {partRange, type EpisodeProps, type FootageItem} from './types';
import {validateEpisode} from './validate';

export const FPS = 30;

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
  const footage = manifest.filter((f) => f.src.startsWith(`footage/${props.footageTag}-`));
  if (!footage.length) throw new Error(`Không có footage cho tag "${props.footageTag}"`);
  const full = {...props, audioSec, footage, captions};
  const {startSec, endSec} = partRange(full);
  const tail = props.part ? 0 : FPS;
  return {props: full, durationInFrames: Math.ceil((endSec - startSec) * FPS) + tail};
};

const defaults: EpisodeProps = {
  title: 'Tiêu đề hook', episodeLabel: 'Tập 1',
  audioSrc: 'ep000/audio.mp3', captionsSrc: '', footageTag: 'craft',
  cutEverySec: 6, dim: 0.3, hookSec: 3,
  chapters: [{title: 'Chương 1', startSec: 0}], parts: [{chapters: [1], hook: 'Hook phần 1'}],
  thumbText: 'Tiêu đề bìa', thumbBg: 'ep000/thumb-bg.jpg',
  part: 0, introSec: 0, audioSec: 0, footage: [], captions: [],
};

export const Root = () => (
  <>
    <Composition id="Episode" component={Story} fps={FPS} width={1080} height={1920}
      durationInFrames={FPS * 60} defaultProps={defaults} calculateMetadata={loadEpisode} />
    <Composition id="Clip" component={Clip} fps={FPS} width={1080} height={1920}
      durationInFrames={FPS * 60} defaultProps={{...defaults, part: 1}} calculateMetadata={loadEpisode} />
    <Still id="Thumbnail" component={Thumbnail} width={1280} height={720} defaultProps={defaults} />
  </>
);
