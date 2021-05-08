import http from '@/libs/http';
import { SUB } from '@/config/path';

/**
 * 获取收藏的歌手列表
 */
export const getSubArtist = () => http.get(SUB.artist);

/**
 * 获取收藏的专栏
 * @param limit 取出歌单数量 , 默认为 50
 * @param offset 偏移位置
 */
export const getSubColumn = (limit?: number, offset?: number) =>
  http.get(SUB.column, {
    params: {
      limit,
      offset,
    },
  });

/**
 * 获取收藏的mv列表
 */
export const getSubMV = () => http.get(SUB.mv);

/**
 * 获取收藏的专辑列表
 * @param limit 取出数量
 * @param offset 偏移位置
 */
export const getSubAlbum = (limit?: number, offset?: number) =>
  http.get(SUB.album, {
    params: {
      limit,
      offset,
    },
  });

/**
 * 获取电台的订阅列表
 */
export const getSubRadio = () => http.get(SUB.radio);

/**
 * 收藏视频
 * @param id 视频id
 */
export const subVideo = (id: number) => http.post(SUB.subVideo, { params: { id, t: 1 } });

/**
 * 取消收藏视频
 * @param id 视频id
 */
export const subVideoCancel = (id: number) =>
  http.post(SUB.subVideoCancel, {
    params: {
      id,
      t: 0,
    },
  });

/**
 * 收藏歌手
 * @param id 歌手id
 */
export const subArtist = (id: number) => http.post(SUB.subArtist, { params: { id, t: 1 } });

/**
 * 取消收藏歌手
 * @param id 歌手id
 */
export const subArtistCancel = (id: number) =>
  http.post(SUB.subArtistCancel, {
    params: {
      id,
      t: 0,
    },
  });

/**
 * 收藏mv
 * @param id mv id
 */
export const subMV = (id: number) => http.post(SUB.subMV, { params: { mvid: id, t: 1 } });

/**
 * 取消收藏mv
 * @param id mv id
 */
export const subMVCancel = (id: number) =>
  http.post(SUB.subMVCancel, {
    params: {
      mvid: id,
      t: 0,
    },
  });

/**
 * 收藏歌单
 * @param id 歌单id
 */
export const subPlaylist = (id: number) => http.post(SUB.subPlaylist, { params: { id, t: 1 } });

/**
 * 取消收藏歌单
 * @param id 歌单id
 */
export const subPlaylistCancel = (id: number) =>
  http.post(SUB.subPlaylistCancel, {
    params: {
      id,
      t: 0,
    },
  });

/**
 * 收藏专辑
 * @param id 专辑id
 */
export const subAlbum = (id: number) => http.post(SUB.subAlbum, { params: { id, t: 1 } });

/**
 * 取消收藏专辑
 * @param id 专辑id
 */
export const subAlbumCancel = (id: number) =>
  http.post(SUB.subAlbumCancel, {
    params: {
      id,
      t: 0,
    },
  });

/**
 * 订阅电台
 * @param id 电台id
 */
export const subRadio = (id: number) => http.post(SUB.subRadio, { params: { rid: id, t: 1 } });

/**
 * 取消订阅电台
 * @param id 电台id
 */
export const subRadioCancel = (id: number) =>
  http.post(SUB.subRadioCancel, {
    params: {
      rid: id,
      t: 0,
    },
  });
