<template>
  <div class="view-home">
    <router-link :to="{ name: 'Search', params: { keyword: 'J.flm' } }">search</router-link>
    <ContentContainer
      v-if="playlist.length !== 0"
      :title="t('home.recommend playlist')"
      :container-class="isMobile ? '' : $style.container"
    >
      <ContainerList v-bind="{ isMobile, options, data: playlist }" #default="{ cover, id, name }">
        <Cover :src="cover" :id="id" type="playlist">
          <CoverMeta v-bind="{ name }" />
        </Cover>
      </ContainerList>
    </ContentContainer>
    <ContentContainer
      v-if="album.length !== 0"
      :title="t('home.new album')"
      :container-class="isMobile ? '' : $style.container"
    >
      <ContainerList
        v-bind="{ isMobile, options, data: album }"
        #default="{ cover, id, name, artists }"
      >
        <Cover :src="cover" :id="id" type="album">
          <CoverMeta v-bind="{ name, artists }" />
        </Cover>
      </ContainerList>
    </ContentContainer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import ContentContainer from "@/components/ContentContainer.vue";
import ContainerList from "@/components/ContainerList.vue";
import Cover from "@/components/Cover.vue";
import CoverMeta from "@/components/CoverMeta.vue";

import MRecPlaylist from "@/models/RecPlaylist";
import MAlbum from "@/models/Album";

import { getAlbumNew, getRecPlaylist } from "@/apis";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    ContentContainer,
    ContainerList,
    Cover,
    CoverMeta,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const playlist = ref<MRecPlaylist[]>([]);
    const album = ref<MAlbum[]>([]);

    const options = {
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 4.2,
          spaceBetween: 25,
        },
        640: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    };

    getRecPlaylist(12).then((res) => {
      playlist.value = res;
    });
    getAlbumNew({ area: "EA", limit: 12 }).then((res) => {
      album.value = res;
    });
    const isMobile = computed(() => store.getters.isMobile);

    return {
      t,
      options,

      playlist,
      album,

      isMobile,
    };
  },
});
</script>

<style module>
.container {
  @apply grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6;
}
</style>
