<template lang="pug">
router-link.nav-bar__title(to='/', :aria-label='`${title}, back to home`')
  AppImage(:src='logo')
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
  @Prop(String) title?: string;

  @Prop(String) logo?: string;
}
</script>
