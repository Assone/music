<template>
  <div class="view-search">
    <div :class="$style.row">
      <AppSection :class="$style.artist">
        <SectionHead title="艺人" :next="genreLink('artist')" />
        <div class="container__artist">
          <Avatar
            v-for="{ id, avatar, name } in artists"
            :key="id"
            :src="avatar"
            :size="120"
            :id="id"
            :name="name"
          />
        </div>
      </AppSection>
      <AppSection :class="$style.album">
        <SectionHead title="专辑" :next="genreLink('album')" />
        <div class="container__album">
          <Cover
            v-for="{ id, name, cover, artists } in albums"
            :key="id"
            :id="id"
            :src="cover"
            :alt="name"
            type="album"
          >
            <CoverMeta :path="`/album/${id}`" :name="name" :artists="artists" />
          </Cover>
        </div>
      </AppSection>
    </div>
    <AppSection>
      <SectionHead title="歌曲" :next="genreLink('song')" />
      <div class="container__song">
        <TrackListItem
          v-for="({ artists, album, id, name, playable }, index) in songs"
          :key="id"
          type="playlist"
          :id="id"
          :name="name"
          :album="album"
          :artists="artists"
          :disabled="!playable"
          @click="isMobile && playable ? $emit('play', { index, track: id }) : ''"
          @dblclick="playable ? $emit('play', { index, track: id }) : ''"
        />
      </div>
    </AppSection>
    <AppSection>
      <SectionHead title="MV" :next="genreLink('mv')" />
      <div class="container__mv">
        <Cover v-for="{ id, cover, name } in mvs" :key="id" :src="cover" :id="id" type="mv">
          <CoverMeta :path="`/mv/${id}`" :name="name" />
        </Cover>
      </div>
    </AppSection>
    <AppSection>
      <SectionHead title="歌单" :next="genreLink('playlist')" />
      <div class="container__playlist">
        <Cover
          v-for="{ id, name, cover } in playlists"
          :key="id"
          :id="id"
          :src="cover"
          :alt="name"
          type="playlist"
        >
          <CoverMeta :path="`/playlist/${id}`" :name="name" />
        </Cover>
      </div>
    </AppSection>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from 'vue';
import { start, done } from 'nprogress';

import { getSearch } from '@/apis';
import { TypeIDSearch } from '@/config/code';

import { useStore } from '@/store';

import AppSection from '@/components/common/AppSection.vue';
import Avatar from '@/components/Avatar.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import SectionHead from '@/components/SectionHead.vue';
import TrackListItem from '@/components/TrackListItem.vue';

import MAlbum from '@/models/Album';
import MArtist from '@/models/Artist';
import MSong from '@/models/Song';
import MMV from '@/models/MV';
import MPlaylist from '@/models/Playlist';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
  components: {
    AppSection,
    Avatar,
    Cover,
    CoverMeta,
    SectionHead,
    TrackListItem,
  },
  props: {
    keyword: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { keyword } = toRefs(props);

    const artists = ref<MArtist[]>([]);
    const albums = ref<MAlbum[]>([]);
    const songs = ref<MSong[]>([]);
    const mvs = ref<MMV[]>([]);
    const playlists = ref<MPlaylist[]>([]);

    const isMobile = computed(() => store.getters.isMobile);

    const genreLink = (type: string) => ({
      link: {
        path: '/search/more',
        query: {
          type,
          keyword: keyword.value,
        },
      },
      text: '查看更多',
    });

    const loadingData = (keyword: string) =>
      Promise.all([
        getSearch(keyword, { limit: 3, type: TypeIDSearch.artist }).then(
          ({ type, result: { artistCount, artists } }) => ({
            type,
            count: artistCount,
            data: artists.map((art) => new MArtist(art)),
          }),
        ),
        getSearch(keyword, { limit: 3, type: TypeIDSearch.album }).then(
          ({ type, result: { albumCount, albums } }) => ({
            type,
            count: albumCount,
            data: albums.map((album) => new MAlbum(album)),
          }),
        ),
        getSearch(keyword, { limit: 12, type: TypeIDSearch.song }).then(
          ({ type, result: { songCount, songs } }) => ({
            type,
            count: songCount,
            data: songs.map((song) => new MSong(song)),
          }),
        ),
      ])
        .then((responds) =>
          responds.forEach(({ type, data }) => {
            switch (type) {
              case TypeIDSearch.artist:
                artists.value = data as MArtist[];
                break;
              case TypeIDSearch.album:
                albums.value = data as MAlbum[];
                break;
              case TypeIDSearch.song:
                songs.value = data as MSong[];
                break;
              // not default
            }
          }),
        )
        .then(() =>
          Promise.all([
            getSearch(keyword, { limit: 6, type: TypeIDSearch.mv }).then(
              ({ type, result: { mvCount, mvs } }) => ({
                type,
                count: mvCount,
                data: mvs.map((mv) => new MMV(mv)),
              }),
            ),
            getSearch(keyword, { limit: 12, type: TypeIDSearch.playlist }).then(
              ({ type, result: { playlistCount, playlists } }) => ({
                type,
                count: playlistCount,
                data: playlists.map((playlist) => new MPlaylist(playlist)),
              }),
            ),
          ]).then((responds) =>
            responds.forEach(({ type, data }) => {
              switch (type) {
                case TypeIDSearch.mv:
                  mvs.value = data as MMV[];
                  break;
                case TypeIDSearch.playlist:
                  playlists.value = data as MPlaylist[];
                  break;
                // not default
              }
            }),
          ),
        );

    // getSearch('五月天', { type: TypeIDSearch.user });
    // getSearch('五月天', { type: TypeIDSearch.lyric });
    // getSearch('五月天', { type: TypeIDSearch.radio });
    // getSearch('五月天', { type: TypeIDSearch.video });
    // getSearch('五月天', { type: TypeIDSearch.comprehensive });

    loadingData(keyword.value);

    onMounted(() => {
      done();
    });
    onBeforeRouteUpdate((to) => {
      start();
      loadingData(to.params.keyword as string).then(() => done());
    });

    return {
      isMobile,

      artists,
      albums,
      songs,
      mvs,
      playlists,

      genreLink,
    };
  },
});
</script>

<style lang="scss" module>
.row {
  display: flex;

  @include media(xs, sm) {
    flex-direction: column;
  }

  @include media(md) {
    flex-direction: row;

    justify-content: space-between;
    gap: 5rem;
    min-height: 30vh;
  }
}

.artist {
  flex: 1;

  @include media(md) {
    flex-shrink: 0;
    flex-wrap: wrap;
  }
}

.album {
  flex: 1;
}
</style>

<style lang="scss" scoped>
@include b(container) {
  @include e(album) {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
  }

  @include e(song) {
    display: grid;

    @include media(xs) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @include media(sm) {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }

    @include media(lg) {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }

  @include e(mv) {
    display: grid;

    gap: 10px;

    @include media(sm) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @include media(lg) {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }

  @include e(playlist) {
    display: grid;
    gap: 10px;

    @include media(xs) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @include media(sm) {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }

    @include media(lg) {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }
}
</style>
