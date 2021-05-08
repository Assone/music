<template lang="pug">
article.source-head
  Cover.source-head__cover(:src='cover')
  SourceHeadMeta(v-bind='meta') #[slot]
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Cover from './Cover.vue';
import SourceHeadMeta, { Props } from './SourceHeadMeta.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    Cover,
    SourceHeadMeta,
  },
  props: {
    cover: {
      type: String,
      required: true,
    },
    meta: {
      type: Object as PropType<Props>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@include b(source, head) {
  display: flex;

  margin-top: 20px;
  margin-bottom: 20px;

  @include media(xs) {
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  @include e(cover) {
    flex-shrink: 0;

    width: 20vw;
    margin-right: 20px;

    @include media(xs) {
      width: 60vw;
      margin: 0;
    }
  }
}
</style>
