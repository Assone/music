<template lang="pug">
.cover-controls
  AppIcon(type='media-play')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppIcon from './common/AppIcon.vue';

@Component({
  components: {
    AppIcon,
  },
})
export default class CoverControls extends Vue {}
</script>

<style lang="scss" scoped>
@include b(cover, controls) {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
