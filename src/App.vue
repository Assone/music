<template>
  <AppLayout :class="[`is-${devicesType}`]" />
  <Player :class="[`is-${devicesType}`]" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import Player from '@/containers/Player.vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
    Player,
  },
  setup() {
    const store = useStore();

    const devicesType = computed<'pc' | 'mobile'>(() => store.getters.devicesType);

    return {
      devicesType,
    };
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
