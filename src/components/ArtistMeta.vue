<template lang="pug">
article.artist-meta
  Avatar.artist-meta__avatar(:src='avatar', round)
  .artist-meta__info
    h1.meta-info__name {{ name }}
    .meta-info__source-count
      span(v-if='music') {{ music }}首歌
      span(v-if='album') {{ album }}张专辑
      span(v-if='mv') {{ mv }}个MV
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Avatar from './Avatar.vue';

@Component({
  components: {
    Avatar,
  },
})
export default class ArtistMeta extends Vue {
  @Prop({ type: String, required: true }) name!: string;

  @Prop({ type: String, required: true }) avatar!: string;

  @Prop({ type: Number }) id?: number;

  @Prop({ type: Number }) mv?: number;

  @Prop({ type: Number }) music?: number;

  @Prop({ type: Number }) album?: number;
}
</script>

<style lang="scss" scoped>
@include b(artist, meta) {
  display: grid;
  grid-template-columns: 12vw auto;

  margin-top: 10vh;
}

@include b(meta, info) {
  @include e(source-count) {
    display: flex;
  }
}
</style>
