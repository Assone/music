import { toRefs, reactive } from "vue";
import { getAlbumDetail } from "@/apis";
import { formatDate, formatTime } from "@/utils";

export default async function useAlbumDetail(props: Readonly<{ id: number }>) {
  const { id } = toRefs(props);

  const { album, songs } = reactive(await getAlbumDetail(id.value));
  const { name, cover, description, company, artist, time } = reactive(album);
  const publishTime = formatDate(time.publish as number, {
    locales: navigator.language,
    options: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  });
  const duration = formatTime(
    songs.reduce((pre, cur) => pre + cur.duration, 0),
    "mm分钟"
  );

  return {
    songs,

    name,
    cover,
    description,
    artist,
    company,

    publishTime,
    duration,
  };
}
