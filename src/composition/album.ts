import { reactive } from 'vue';
import { getAlbumDetail } from '@/apis';
import { formatDate, formatTime } from '@/utils';

export const useAlbumDetailData = async (id: number) => {
  const { album, songs } = await getAlbumDetail(id);
  const { name, cover, description, company, artist, time } = reactive(album);
  const publishTime = formatDate(time.publish as number, {
    locales: navigator.language,
    options: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  });
  const duration = formatTime(
    songs.reduce((pre, cur) => pre + cur.duration, 0),
    'mm分钟',
  );
  const ids = songs.filter((song) => song.playable).map((song) => song.id);

  return {
    name,
    cover,
    description,
    company,
    artist,
    publishTime,
    duration,
    ids,
    songs,
  };
};
