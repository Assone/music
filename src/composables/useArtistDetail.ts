import { Ref, reactive, computed, toRefs, toRaw } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

import {
  getArtistAlbum,
  getArtistInfo,
  getArtistMV,
  getSimilarArtist,
} from "@/apis";

import MAlbum from "@/models/Album";
import MArtist from "@/models/Artist";
import MArtistMV from "@/models/ArtistMV";
import MSong from "@/models/Song";
import useStore from "./useStore";

export default function useArtistDetail(id: Ref<number>) {
  const { isMobile, setMvTracks } = useStore();

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

  const album = computed(() =>
    data.albums.filter((album) => album.type === "专辑")
  );
  const epAndSingle = computed(() =>
    data.albums.filter((album) =>
      ["EP/Single", "EP", "Single"].includes(album.type)
    )
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
  const handlePlayVideo = (e: { type: string; id: number }) => {
    if (e.type === "mv") {
      setMvTracks(toRaw(data.mv).map((m) => m.id));
    }
  };

  onBeforeRouteUpdate((to, _from, next) => {
    fetch(Number(to.params.id)).then(next);
  });

  fetch(id.value);

  return {
    ...toRefs(data),
    album,
    epAndSingle,
    name,
    avatar,
    size,
    handlePlayVideo,
    isMobile,
  };
}
