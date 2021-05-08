<template lang="pug">
article.section-head
  .section-head__meta
    AppAvatar(v-if='avatar', :src='avatar')
    .section-head__info
      h2 {{ title }}
      p(v-if='description') {{ description }}
  .section-head__link(v-if='next') #[router-link(:to='next.link') {{ next.text }}]
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import AppAvatar from './common/AppAvatar.vue';

export default defineComponent({
  components: {
    AppAvatar,
  },
  props: {
    avatar: String,
    title: String,
    description: String,
    next: {
      type: Object as PropType<{ link: string; text: string }>,
    },
  },
});
</script>

<style lang="scss" scoped>
@include b(section, head) {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include e(meta) {
    display: flex;
    align-items: center;
  }
}
</style>
