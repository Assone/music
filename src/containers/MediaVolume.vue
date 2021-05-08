<template lang="pug">
article.media-volume(@mouseenter='() => (show = true)', @mouseleave='() => (show = false)')
  transition(name='fade')
    Slider(v-show='show', :class='["media-volume__slider"]' v-model='value', :min='0', :max='1', :interval="0.01" :width='100' tooltip='none')
  AppIcon.media-volume__icon(@click='handleClick', :type='mute ? "volume-mute" : "volume-play"')
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Slider from 'vue-slider-component';

import AppIcon from '@/components/common/AppIcon.vue';
import { useMediaControls, useMediaState, useMediaVolume } from '@/hooks/media';

export default defineComponent({
  components: {
    AppIcon,
    Slider,
  },
  setup() {
    const { value } = useMediaVolume();
    const { setMute } = useMediaControls();
    const { mute } = useMediaState();

    const show = ref(false);

    const handleClick = () => {
      setMute(!mute.value);
    };

    return {
      value,
      show,

      mute,

      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'vue-slider-component/lib/theme/default.scss';

@include b(media, volume) {
  position: relative;

  @include e(icon) {
    width: 25px;
  }

  @include e(slider) {
    position: absolute;
    top: 2px;
    right: 35px;
  }
}

@include transition(fade) {
  @include direction(enter-active, leave-active) {
    transition: opacity 0.5s;
  }

  @include direction(enter, leave-to) {
    opacity: 0;
  }
}
</style>
