<template>
  <div class="view-home">
    <AppSection>
      <SectionHead title="推荐歌单" />
      <AppBanner :options="options" :data="playlist" #default="{ id, name, cover }">
        <Cover :id="id" :src="cover" type="playlist">
          <CoverMeta :path="`/playlist/${id}`" :name="name" />
        </Cover>
      </AppBanner>
    </AppSection>
    <AppSection>
      <SectionHead title="专辑上新" />
      <div class="container__album">
        <Cover
          v-for="{ id, name, cover, artists } in album"
          :key="id"
          :id="id"
          :src="cover"
          type="album"
        >
          <CoverMeta :path="`/album/${id}`" :name="name" :artists="artists" />
        </Cover>
      </div>
    </AppSection>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { done } from 'nprogress';

import AppSection from '@/components/common/AppSection.vue';
import AppBanner, { Options } from '@/components/common/AppBanner.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import SectionHead from '@/components/SectionHead.vue';
import { getAlbumNew, getRecMV, getRecPlaylist } from '@/apis';

export default defineComponent({
  components: {
    AppBanner,
    AppSection,
    Cover,
    CoverMeta,
    SectionHead,
  },
  async setup() {
    const playlist = ref(await getRecPlaylist(10));
    const mvs = ref(await getRecMV());
    const album = ref(await getAlbumNew({ area: 'EA', limit: 12 }));

    const options = ref<Options>({
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 3.2,
          spaceBetween: 25,
        },
        640: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });

    done();

    return {
      playlist,
      mvs,
      album,
      options,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(container) {
  @include e(album) {
    display: grid;
    gap: 20px;

    @include media(xs) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
      column-gap: 10px;
    }

    @include media(sm) {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }

    @include media(xl) {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }
}
</style>
