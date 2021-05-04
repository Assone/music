<template lang="pug">
article.app-icon(v-on='$listeners', :style='{ width: `${size}px`, height: `${size}px` }')
  component(:is='type')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    MediaPrev: () => import('../icons/MediaPrev.vue'),
    MediaNext: () => import('../icons/MediaNext.vue'),
    MediaPlay: () => import('../icons/MediaPlay.vue'),
    MediaPause: () => import('../icons/MediaPause.vue'),
    VolumePlay: () => import('../icons/VolumePlay.vue'),
    VolumeMute: () => import('../icons/VolumeMute.vue'),
    More: () => import('../icons/More.vue'),
  },
})
export default class AppIcon extends Vue {
  @Prop({ type: String, required: true }) type!: string;

  @Prop({ type: Number }) size?: number;
}
</script>

<style lang="scss" scoped>
@include b(app, icon) {
  width: 24px;
  height: 24px;

  cursor: pointer;
  fill: currentColor;
}
</style>
