<template lang="pug">
#app
  AppLayout
  Player
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppLayout from '@/layouts/AppLayout.vue';
import Player from '@/containers/Player.vue';

@Component({
  components: {
    AppLayout,
    Player,
  },
})
export default class App extends Vue {}
</script>
