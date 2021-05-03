<template lang="pug">
article.app-progress(
  v-show='loading',
  :style='[position === "top" ? { top: "0px" } : { bottom: "0px" }]'
)
  .app-progress__bar(role='bar')
    .bar-padding
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppProgress extends Vue {
  @Prop({ type: String, default: 'top' }) position!: 'top' | 'bottom';

  loading = false;
}
</script>

<style lang="scss" scoped>
@include b(app, progress) {
  position: fixed;

  @include e(bar) {
    width: 100%;
  }
}
</style>
