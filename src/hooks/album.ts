import { reactive } from 'vue';
import { getAlbumDetail } from '@/apis';
import { formatDate, formatTime } from '@/utils';

export const useAlbumDetailData = async (id: number) => {
  const { album, songs } = await getAlbumDetail(id);
  const { name, cover, description, company, artist, time } = reactive(album);
  const publish = formatDate(time.publish as number);
  const duration = formatTime(songs.reduce((pre, cur) => pre + cur.duration, 0));
  const ids = songs.map((song) => song.id);

  return {
    name,
    cover,
    description,
    company,
    artist,
    publish,
    duration,
    ids,
    songs,
  };
};
