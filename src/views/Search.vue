<template>
  <div class="view-search">
    <input
      class="dark:bg-gray-600 dark:bg-opacity-30 px-2 py-1"
      type="search"
      placeholder="place input the search keyword"
      v-model.lazy="keyword"
    />

    <div class="view-result">
      <div class="gap-4 xs:flex-col lg:flex">
        <ContentContainer
          v-if="artists.length !== 0"
          title="Artists"
          class="flex-1"
          container-class="flex gap-4 "
        >
          <div
            class="flex flex-col justify-center items-center gap-4 h-full"
            v-for="{ id, avatar, name } in artists"
            :key="id"
          >
            <AppAvatar
              class="
                xs:!w-32 xs:!h-32
                sm:!w-32 sm:!h-32
                xl:!w-40 xl:!h-40
                2xl:!w-52 2xl:!h-52
              "
              :src="avatar"
            />
            <router-link :to="`/artist/${id}`">{{ name }}</router-link>
          </div>
        </ContentContainer>
        <ContentContainer
          v-if="albums.length !== 0"
          title="Albums"
          class="flex-1"
          container-class="flex justify-center items-center gap-4"
        >
          <Cover
            v-for="{ id, cover, name } in albums"
            :key="id"
            :src="cover"
            :id="id"
            type="album"
          >
            <CoverMeta v-bind="{ name }" />
          </Cover>
        </ContentContainer>
      </div>
      <ContentContainer
        v-if="mvs.length !== 0"
        title="Playlist"
        container-class="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-10"
      >
        <Cover
          v-for="{ id, name, cover } in playlists"
          :key="id"
          :src="cover"
          :id="id"
          type="playlist"
        >
          <CoverMeta v-bind="{ name }" />
        </Cover>
      </ContentContainer>
      <ContentContainer
        v-if="mvs.length !== 0"
        title="MV"
        container-class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
      >
        <Cover
          v-for="{ id, name, cover } in mvs"
          :key="id"
          :src="cover"
          :id="id"
          type="mv"
          rectangle
        >
          <CoverMeta v-bind="{ name }" />
        </Cover>
      </ContentContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";

import { getSearch } from "@/apis";
import { TypeIDSearch } from "@/config/code";

import AppAvatar from "@/components/common/AppAvatar.vue";
import ContentContainer from "@/components/ContentContainer.vue";
import Cover from "@/components/Cover.vue";
import CoverMeta from "@/components/CoverMeta.vue";

import MAlbum from "@/models/Album";
import MArtist from "@/models/Artist";
import MSong from "@/models/Song";
import MMV from "@/models/MV";
import MPlaylist from "@/models/Playlist";

export default defineComponent({
  components: {
    AppAvatar,
    ContentContainer,
    Cover,
    CoverMeta,
  },
  setup() {
    const keyword = ref("");
    const result = reactive<{
      songs: MSong[];
      albums: MAlbum[];
      artists: MArtist[];
      mvs: MMV[];
      playlists: MPlaylist[];
    }>({
      songs: [],
      albums: [],
      artists: [],
      mvs: [],
      playlists: [],
    });
    const total = reactive({
      songs: 0,
      albums: 0,
      artists: 0,
      mvs: 0,
      playlists: 0,
    });

    const fetch = () => {
      getSearch(keyword.value, { type: TypeIDSearch.artist, limit: 3 }).then(
        ({ result: { artistCount, artists } }) => {
          total.artists = artistCount;
          result.artists = artists?.map((artist) => new MArtist(artist)) || [];
        }
      );

      getSearch(keyword.value, { type: TypeIDSearch.album, limit: 3 }).then(
        ({ result: { albumCount, albums } }) => {
          total.albums = albumCount;
          result.albums = albums?.map((album) => new MAlbum(album)) || [];
        }
      );

      getSearch(keyword.value, { type: TypeIDSearch.song }).then(
        ({ result: { songCount, songs } }) => {
          total.songs = songCount;
          result.songs = songs?.map((song) => new MSong(song)) || [];
        }
      );

      getSearch(keyword.value, { type: TypeIDSearch.playlist, limit: 20 }).then(
        ({ result: { playlistCount, playlists } }) => {
          total.playlists = playlistCount;
          result.playlists =
            playlists?.map((playlist) => new MPlaylist(playlist)) || [];
        }
      );

      getSearch(keyword.value, { type: TypeIDSearch.mv, limit: 12 }).then(
        ({ result: { mvCount, mvs } }) => {
          total.mvs = mvCount;
          result.mvs = mvs?.map((mv) => new MMV(mv)) || [];
        }
      );
    };

    watch(keyword, fetch);

    return {
      ...toRefs(result),
      keyword,
      total,
    };
  },
});
</script>
