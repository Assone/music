import { computed, reactive, toRefs } from 'vue';
import { getArtistAlbum, getArtistInfo, getArtistMV, getSimilarArtist } from '@/apis';

import MAlbum from '@/models/Album';
import MArtist from '@/models/Artist';
import MArtistMV from '@/models/ArtistMV';
import MSong from '@/models/Song';

export const useArtistDetailData = () => {
  const data = reactive<{
    mv: MArtistMV[];
    similar: MArtist[];
    song: MSong[];
    albums: MAlbum[];
    artist: MArtist | null;
  }>({
    mv: [],
    similar: [],
    song: [],
    albums: [],
    artist: null,
  });

  const album = computed(() => data.albums.filter((album) => album.type === '专辑'));
  const epAndSingle = computed(() =>
    data.albums.filter((album) => ['EP/Single', 'EP', 'Single'].includes(album.type)),
  );

  const name = computed(() => data.artist?.name);
  const avatar = computed(() => data.artist?.avatar);
  const size = computed(() => data.artist?.size);

  const fetch = (id: number) =>
    getArtistInfo(id).then(({ artist, songs }) => {
      data.song = songs;
      data.artist = artist;

      getArtistAlbum(id, 200).then(({ albums }) => {
        data.albums = albums;

        getArtistMV(id).then(({ mv }) => {
          data.mv = mv;
        });
        getSimilarArtist(id).then((res) => {
          data.similar = res;
        });
      });
    });

  return {
    ...toRefs(data),

    name,
    avatar,
    size,

    epAndSingle,
    album,

    fetch,
  };
};
