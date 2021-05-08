<template lang="pug">
article.artist-meta
  Avatar.artist-meta__avatar(:src='avatar', :size='100')
  .artist-meta__info
    h1.meta-info__name {{ name }}
    .meta-info__source-count
      span(v-if='music') {{ music }}首歌
      span(v-if='album') {{ album }}张专辑
      span(v-if='mv') {{ mv }}个MV
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Avatar from './common/AppAvatar.vue';

export default defineComponent({
  components: {
    Avatar,
  },
  props: {
    name: String,
    avatar: {
      type: String,
      require: true,
    },
    id: Number,
    mv: Number,
    music: Number,
    album: Number,
  },
});
</script>

<style lang="scss" scoped>
@include b(artist, meta) {
  display: flex;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 20px;

  @include e(avatar) {
    margin-right: 20px;
  }
}

@include b(meta, info) {
  @include e(source-count) {
    display: flex;
  }
}
</style>
