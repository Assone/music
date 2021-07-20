<template>
  <div class="player fixed bottom-0 h-16">
    <!-- <PlayerVideoCore v-if="isVideo" :track="currentTrack" /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useStore } from '@/store';
// import PlayerVideoCore from "./PlayerVideoCore.vue";

export default defineComponent({
  components: {
    // PlayerVideoCore,
  },
  setup() {
    const store = useStore();

    const currentTrack = computed(() => store.getters['media/currentTrack']);
    const isVideo = computed(() => currentTrack.value?.type === 'video' || currentTrack.value?.type === 'mv');

    return {
      currentTrack,
      isVideo,
    };
  },
});
</script>
