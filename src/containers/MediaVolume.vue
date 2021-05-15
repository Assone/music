<template>
  <article class="media-volume">
    <AppIcon
      class="media-volume__icon"
      @click="handleClick"
      :type="mute ? 'volume-mute' : 'volume-play'"
    />
    <AppSlider
      :class="['media-volume__slider']"
      v-model="value"
      :min="0"
      :max="1"
      :step="0.01"
      :width="100"
      :show-tooltip="false"
      @input="setVolume"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppSlider from '@/components/common/AppSlider.vue';

import AppIcon from '@/components/common/AppIcon.vue';
import { useMediaControls, useMediaState, useMediaVolume } from '@/hooks/media';

export default defineComponent({
  components: {
    AppIcon,
    AppSlider,
  },
  setup() {
    const { value, setVolume } = useMediaVolume();
    const { setMute } = useMediaControls();
    const { mute } = useMediaState();

    const handleClick = () => {
      setMute(!mute.value);
    };

    return {
      value,
      setVolume,

      mute,

      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(media, volume) {
  display: flex;
  align-items: center;

  @include e(icon) {
    width: 25px;
    margin-right: 10px;
  }
}
</style>
