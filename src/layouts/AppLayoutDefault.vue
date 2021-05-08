<template lang="pug">
.app-layout--default
  AppHeader.app-layout--default__head(height='30px') #[slot(name='head')]
  AppMain.app-layout--default__main #[slot]
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppHeader from '@/components/common/AppHeader.vue';
import AppMain from '@/components/common/AppMain.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppMain,
  },
});
</script>

<style lang="scss" scoped>
@mixin setPadding($size) {
  padding-left: $size;
  padding-right: $size;
}

@mixin viewPadding() {
  @include setPadding(10vw);

  @include media(xs) {
    @include setPadding(2vw);
  }

  @include media(sm) {
    @include setPadding(4vw);
  }

  @include media(md) {
    @include setPadding(6vw);
  }
}

@include b(app, layout--default) {
  @include e(head) {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;

    width: $--nav-bar-width;
    height: $--nav-bar-height;

    background-color: $--nav-bar-bg-color;
    backdrop-filter: saturate(180%) blur(15px);
    opacity: 0.8;

    user-select: none;

    @include viewPadding();
  }

  @include e(main) {
    @include viewPadding();
  }
}
</style>
