<template>
  <div class="view-home">
    <ContentContainer
      v-if="playlist.length !== 0"
      :title="t('home.recommend playlist')"
      :container-class="isMobile ? '' : $style.container"
      :link="{ href: '/playlist', name: 'more' }"
    >
      <ContainerList v-slot="{ cover, id, name }" v-bind="{ isMobile, options, data: playlist }">
        <Cover :id="id" :src="cover" type="playlist">
          <CoverMeta v-bind="{ name }" />
        </Cover>
      </ContainerList>
    </ContentContainer>
    <ContentContainer
      v-if="album.length !== 0"
      :title="t('home.new album')"
      :container-class="isMobile ? '' : $style.container"
      :link="{ href: '/album', name: 'more' }"
    >
      <ContainerList v-slot="{ cover, id, name, artists }" v-bind="{ isMobile, options, data: album }">
        <Cover :id="id" :src="cover" type="album">
          <CoverMeta v-bind="{ name, artists }" />
        </Cover>
      </ContainerList>
    </ContentContainer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import ContentContainer from '@/components/ContentContainer.vue';
import ContainerList from '@/components/ContainerList.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

import { getAlbumNew, getRecPlaylist, getRecRadio } from '@/apis';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

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
    const playlist = ref<Model.RecPlaylist[]>([]);
    const album = ref<Model.Album[]>([]);

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

    const isMobile = computed(() => store.getters.isMobile);

    getRecPlaylist(12).then((res) => {
      playlist.value = res;
    });
    getAlbumNew({ area: 'EA', limit: 12 }).then((res) => {
      album.value = res.albums;
    });
    getRecRadio().then((res) => {
      console.log(res);
    });

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
