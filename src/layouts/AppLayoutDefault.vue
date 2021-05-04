<template lang="pug">
.app-layout--default
  AppHeader.app-layout--default__head(v-if='$slots.head')
    slot(name='head')
  AppMain.app-layout--default__main
    slot
  AppFooter.app-layout--default__foot(v-if='$slots.foot')
    slot(name='foot')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppMain from '@/components/common/AppMain.vue';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';

@Component({
  components: {
    AppMain,
    AppHeader,
    AppFooter,
  },
})
export default class AppLayoutDefault extends Vue {}
</script>

<style lang="scss" scoped>
@mixin padding($size) {
  padding-left: $size;
  padding-right: $size;
}

@include b(app, layout--default) {
  @include e(head) {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;

    width: 100%;
    height: var(--nav-bar-height);
    max-height: var(--nav-bar-max-height);

    background: var(--nav-bar-bg-color);
    backdrop-filter: saturate(180%) blur(15px);

    user-select: none;
  }

  @include e(main) {
    @include padding(10vw);
    margin: {
      top: 5vh;
      bottom: 5vh;
    }

    @include media(xs) {
      @include padding(2vw);
    }

    @include media(sm) {
      @include padding(4vw);
    }

    @include media(md) {
      @include padding(6vw);
    }
  }
}
</style>
