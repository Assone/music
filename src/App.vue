<template lang="pug">
AppLayout
Player
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import Player from '@/containers/Player.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
    Player,
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
</style>
