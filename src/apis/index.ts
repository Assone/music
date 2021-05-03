import * as album from './services/album';
import * as artist from './services/artist';
import * as auth from './services/auth';
import * as cloud from './services/cloud';
import * as comment from './services/comment';
import * as dynamic from './services/dynamic';
import * as like from './services/like';
import * as mv from './services/mv';
import * as notice from './services/notice';
import * as playlist from './services/playlist';
import * as radio from './services/radio';
import * as recommend from './services/recommend';
import * as search from './services/search';
import * as similar from './services/similar';
import * as song from './services/song';
import * as sub from './services/sub';
import * as top from './services/top';
import * as track from './services/track';
import * as user from './services/user';
import * as video from './services/video';

export * from './services/album';
export * from './services/artist';
export * from './services/auth';
export * from './services/cloud';
export * from './services/comment';
export * from './services/dynamic';
export * from './services/like';
export * from './services/mv';
export * from './services/notice';
export * from './services/playlist';
export * from './services/radio';
export * from './services/recommend';
export * from './services/search';
export * from './services/similar';
export * from './services/song';
export * from './services/sub';
export * from './services/top';
export * from './services/track';
export * from './services/user';
export * from './services/video';

const api = {
  ...album,
  ...artist,
  ...auth,
  ...cloud,
  ...comment,
  ...dynamic,
  ...like,
  ...mv,
  ...notice,
  ...playlist,
  ...radio,
  ...recommend,
  ...search,
  ...similar,
  ...song,
  ...sub,
  ...top,
  ...track,
  ...user,
  ...video,
};

export default api;
