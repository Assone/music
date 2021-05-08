import { TRACK } from '@/config/path';
import { isNumber } from '@/utils/is';
import http from '@/libs/http';

/**
 * 歌单添加歌曲
 * @param pid 歌单ID
 * @param tracks 歌曲id
 */
export const addTrackToPlaylist = (pid: number, tracks: number | number[]) =>
  http.post(TRACK.addToPlaylist, {
    pid,
    op: 'add',
    tracks: isNumber(tracks) ? tracks : tracks.join(','),
  });

/**
 * 歌单删除歌曲
 * @param pid 歌单ID
 * @param tracks 歌曲id
 */
export const deleteTrackToPlaylist = (pid: number, tracks: number | number[]) =>
  http.post(TRACK.delToPlaylist, {
    pid,
    op: 'del',
    tracks: isNumber(tracks) ? tracks : tracks.join(','),
  });

/**
 * 收藏视频到视频歌单
 * @param pid 歌单ID
 * @param tracks 视频ID
 */
export const addTrackToVideoList = (pid: number, tracks: number | number[]) =>
  http.post(TRACK.addToPlaylistVideo, { pid, ids: isNumber(tracks) ? tracks : tracks.join(',') });

/**
 * 删除视频歌单里的视频
 * @param pid 歌单id
 * @param tracks 视频id
 */
export const deleteTrackToVideoList = (pid: number, tracks: number | number[]) =>
  http.post(TRACK.delToPlaylistVideo, { pid, ids: isNumber(tracks) ? tracks : tracks.join(',') });
