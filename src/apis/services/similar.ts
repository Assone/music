import { SIMILAR } from '@/config/path';
import http from '@/libs/http';
import MArtist from '@/models/Artist';
import MSimilarMV from '@/models/SimilarMV';

/**
 * 获取相似歌手
 * @param id 歌手id
 */
export const getSimilarArtist = (id: number) =>
  http
    .get<{ artists: IrArtistDetail[] }>(SIMILAR.artist, { params: { id } })
    .then(({ artists }) => artists.map((art) => new MArtist(art)));

/**
 * 获取相似歌单
 * @param id 歌单id
 */
export const getSimilarPlaylist = (id: number) => http.get(SIMILAR.playlist, { params: { id } });

/**
 * 获取相似MV
 * @param id mv id
 */
export const getSimilarMV = (id: number) =>
  http
    .get<{ mvs: IrSimilarMV[] }>(SIMILAR.mv, { params: { mvid: id } })
    .then(({ mvs }) => mvs.map((mv) => new MSimilarMV(mv)));

/**
 * 获取相似歌曲
 * @param id 歌曲id
 */
export const getSimilarSong = (id: number) => http.get(SIMILAR.song, { params: { id } });

/**
 * 获取最近 5 个听了这首歌的用户
 * @param id 歌曲id
 */
export const getSimilarUser = (id: number) => http.get(SIMILAR.user, { params: { id } });
