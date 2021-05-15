<template>
  <article class="artist-meta">
    <Avatar class="artist-meta__avatar" :src="avatar" :size="100" />
    <div class="artist-meta__info">
      <h1 class="meta-info__name">{{ name }}</h1>
      <div class="meta-info__source-count">
        <span v-if="music">{{ music }}首歌</span>
        <span v-if="album">{{ album }}张专辑</span>
        <span v-if="mv">{{ mv }}个MV</span>
      </div>
    </div>
  </article>
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
