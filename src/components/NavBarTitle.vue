<template lang="pug">
router-link.nav-bar__title(to='/')
  AppImage.nav-bar__logo(v-if='logo', :src='logo', fit='cover')
  | {{ title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import AppImage from './common/AppImage.vue';

@Component({
  components: {
    AppImage,
  },
})
export default class NavBarTitle extends Vue {
  @Prop({ type: String }) title?: string;

  @Prop({ type: String }) logo?: string;
}
</script>

<style lang="scss" scoped>
@include b(nav, bar) {
  @include e(logo) {
    width: 30px;
    height: 30px;
  }
}
</style>
