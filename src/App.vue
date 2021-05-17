<template>
  <AppLayout />
  <ReloadPrompt />
  <Player />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import Player from '@/containers/Player.vue';
import ReloadPrompt from '@/components/ReloadPrompt.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
    Player,
    ReloadPrompt,
  },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#app {
  font-family: 'Barlow', -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>
