<template>
  <article class="player">
    <teleport to="#app">
      <PlayerView :show="show" />
    </teleport>
    <MediaProgress
      class="player__progress"
      :current="currentTime"
      :duration="duration"
      @update="setCurrentPlayTime"
    />
    <div class="player__controls">
      <MediaControl />
      <MediaAudioInfo />
      <MediaVolume v-if="devicesType === 'pc'" />
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMediaAudioCore, useMediaState } from '@/hooks/media';
import { formatTime } from '@/utils';

import MediaProgress from '@/components/MediaProgress.vue';
import MediaAudioInfo from './MediaAudioInfo.vue';
import MediaControl from './MediaControl.vue';
import MediaVolume from './MediaVolume.vue';
import PlayerView from './PlayerView.vue';
import { useDevicesType } from '@/hooks/devices';

export default defineComponent({
  components: {
    MediaAudioInfo,
    MediaProgress,
    MediaControl,
    MediaVolume,
    PlayerView,
  },
  setup() {
    const { show } = useMediaState();
    const { devicesType } = useDevicesType();

    const currentTime = ref(0);
    const duration = ref(0);
    const { setCurrentPlayTime } = useMediaAudioCore({ currentTime, duration });

    const formatCurrentTime = computed(() => formatTime(currentTime.value * 1000));
    const formatDuration = computed(() => formatTime(duration.value * 1000));

    return {
      show,
      devicesType,

      currentTime,
      duration,

      formatCurrentTime,
      formatDuration,

      setCurrentPlayTime,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(player) {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  height: $--player-height;

  @include e(progress) {
    position: absolute;
    top: -8px;
    right: 0;
    left: 0;
  }

  @include e(controls) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    padding: 10px;

    background-color: $--player-bg-color;
  }
}
</style>
