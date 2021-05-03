<template lang="pug">
article.avatar
  .avatar__container
    AppImage.avatar__inner(
      v-bind='$attrs',
      fit='cover',
      alt='avatar',
      @click='id ? $router.push(`/artist/${id}`) : ""',
      :class='{ "can-click": id }'
    )
  router-link(v-if='id', :to='`/artist/${id}`') {{ name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import AppImage from './common/AppImage.vue';

@Component({
  components: {
    AppImage,
  },
})
export default class Avatar extends Vue {
  @Prop({ type: String }) name?: string;

  @Prop({ type: Number }) id?: number;
}
</script>

<style lang="scss" scoped>
@include b(avatar) {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include e(inner) {
    width: 10vw;
    height: 10vw;

    border-radius: 50%;

    @include can(click) {
      cursor: pointer;
    }
  }
}
</style>
