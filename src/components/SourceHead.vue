<template lang="pug">
article.source-head
  Cover.source-head__cover(:src='cover')
  SourceHeadMeta(v-bind='$attrs') #[slot]
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Cover from './Cover.vue';
import SourceHeadMeta from './SourceHeadMeta.vue';

@Component({
  inheritAttrs: false,
  components: {
    Cover,
    SourceHeadMeta,
  },
})
export default class SourceHead extends Vue {
  @Prop({ type: String, required: true }) cover!: string;
}
</script>

<style lang="scss" scoped>
@include b(source, head) {
  display: flex;

  margin-top: 50px;

  @include e(cover) {
    flex-shrink: 0;

    width: 20vw;
    margin-right: 20px;
  }
}
</style>
