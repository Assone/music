import { SEARCH } from '@/config/path';
import http from '@/libs/http';

/**
 * 获取搜索
 * @param keywords 关键字
 * @param options 选项
 * @param options.limit 返回数量
 * @param options.offset 偏移位置
 * @param options.type 搜索类型
 */
export const getSearch = <T extends 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018>(
  keywords: string,
  options?: {
    limit?: number;
    offset?: number;
    type?: T;
  },
) =>
  http
    .get<{
      result: T extends 1
        ? { songCount: number; songs: IrSongDetail[] }
        : T extends 10
        ? { albumCount: number; albums: IrAlbumDetail[] }
        : T extends 100
        ? { artistCount: number; artists: IrArtistDetail[] }
        : T extends 1000
        ? { playlistCount: number; playlists: IrPlaylistDetail[] }
        : T extends 1002
        ? { userprofileCount: number; userprofiles: IrUserProfile[] }
        : T extends 1004
        ? // ? { videoCount: number; videos: [] }
          { mvCount: number; mvs: IrMVDetail[] }
        : T extends 1006
        ? { songsCount: number; songs: IrSongDetail[] }
        : T extends 1009
        ? { djRadiosCount: number; djRadios: [] }
        : T extends 1014
        ? { mvCount: number; mvs: IrMVDetail[] }
        : {};
    }>(SEARCH.index, {
      params: { keywords, limit: options?.limit, offset: options?.offset, type: options?.type },
    })
    .then(({ result }) => ({ result, type: options?.type }));

/**
 * 获取默认搜索关键字
 */
export const getSearchKeywords = () => http.get(SEARCH.keyword);

/**
 * 获取热搜列表（简略）
 */
export const getSearchHot = () => http.get(SEARCH.hot);

/**
 * 获取热搜列表（详细）
 */
export const getSearchHotDetail = () => http.get(SEARCH.hotDetail);

/**
 * 获取搜索建议
 * @param keywords 关键字
 * @param type 如果传 'mobile' 则返回移动端数据
 */
export const getSearchSuggestion = (keywords: string, type?: 'mobile') =>
  http.get(SEARCH.suggestion, { params: { keywords, type } });

/**
 * 获取搜索多重匹配
 * @param keywords 关键字
 */
export const getSearchMultiMatch = (keywords: string) =>
  http.get(SEARCH.multiMatch, { params: { keywords } });
