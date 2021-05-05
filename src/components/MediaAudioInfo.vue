<template lang="pug">
article.media-audio__info
  AppImage.media-audio__cover(:src='cover', fit='cover')
  CoverMeta(:name='name', :artists='artists')
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import MSong from '@/models/Song';

import AppImage from './common/AppImage.vue';
import CoverMeta from './CoverMeta.vue';

@Component({
  components: {
    CoverMeta,
    AppImage,
  },
})
export default class MediaAudioInfo extends Vue {
  @Prop({ type: Number, required: true }) track!: number;

  info: MSong | null = null;

  @Watch('track', { immediate: true })
  async handleTrack(value: number) {
    const { songs } = await this.$api.getSongDetail(value);
    [this.info] = songs;
  }

  get name() {
    return this.info?.name;
  }

  get cover() {
    return this.info?.album.cover;
  }

  get artists() {
    return this.info?.artists;
  }
}
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

  @include e(cover) {
    width: 40px;
    height: 40px;

    border-radius: 2px;
    margin-right: 10px;
  }
}
</style>
