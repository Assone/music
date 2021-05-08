<template lang="pug">
article.media-control
  AppIcon.media-control__prev(@click='prev', type='media-prev')
  AppIcon.media-control__status(
    @click='status ? pause() : play()',
    :type='status ? "media-pause" : "media-play"'
  )
  AppIcon.media-control__next(@click='next', type='media-next')
  AppIcon(type='arrow' @click='show ? closePlayer() : openPlayer()')
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMediaControls, useMediaState } from '@/hooks/media';

import AppIcon from '@/components/common/AppIcon.vue';

export default defineComponent({
  components: {
    AppIcon,
  },
  setup() {
    const { status, show } = useMediaState();
    const { play, pause, prev, next, openPlayer, closePlayer } = useMediaControls();

    return {
      status,

      play,
      pause,
      prev,
      next,
      show,
      openPlayer,
      closePlayer,
    };
  },
});
</script>

<style></style>
