<template>
  <article class="media-audio__info" v-show="cover">
    <AppImage :class="['media-audio__cover', $style.cover]" :src="cover" fit="cover" />
    <CoverMeta :name="name" :artists="artists" />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useMediaAudioInfo } from '@/hooks/media';

import AppImage from '@/components/common/AppImage.vue';
import CoverMeta from '@/components/CoverMeta.vue';

export default defineComponent({
  components: {
    CoverMeta,
    AppImage,
  },
  setup() {
    const { name, cover, artists } = useMediaAudioInfo();

    return {
      name,
      cover,
      artists,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(media, audio) {
  @include e(info) {
    display: flex;
    align-items: center;
  }

  @include e(creator) {
    display: flex;
    flex-direction: column;
    justify-items: center;
  }
}
</style>

<style lang="scss" module>
.cover {
  width: 40px;
  height: 40px;

  border-radius: 2px;
  margin-right: 10px;
}
</style>
