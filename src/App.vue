<template lang="pug">
#app
  AppProgress
  AppLayout
  Player
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppLayout from '@/layouts/AppLayout.vue';
import AppProgress from '@/components/common/AppProgress.vue';
import Player from '@/containers/Player.vue';

@Component({
  components: {
    AppLayout,
    AppProgress,
    Player,
  },
})
export default class App extends Vue {}
</script>
