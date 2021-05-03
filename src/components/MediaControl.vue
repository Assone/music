<template lang="pug">
article.media-control
  AppIcon.media-control__prev(@click='prev', type='media-prev')
  AppIcon.media-control__status(
    @click='status ? pause() : play()',
    :type='status ? "media-pause" : "media-play"'
  )
  AppIcon.media-control__next(@click='next', type='media-next')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import AppIcon from './common/AppIcon.vue';

@Component({
  components: {
    AppIcon,
  },
})
export default class MediaControl extends Vue {
  @Prop({ type: Boolean, required: true }) status!: boolean;

  @Prop({ type: Function, required: true }) play!: () => void;

  @Prop({ type: Function, required: true }) pause!: () => void;

  @Prop({ type: Function, required: true }) prev!: () => void;

  @Prop({ type: Function, required: true }) next!: () => void;
}
</script>

<style lang="scss" scoped>
@include b(media, control) {
  display: flex;
}
</style>
