<template lang="pug">
article.media-volume(@mouseenter='() => (show = true)', @mouseleave='() => (show = false)')
  transition(name='fade')
    input(v-show='show', type='range', v-model.number='value', max='1', min='0', step='0.01')
  AppIcon.media-volume__icon(@click='setMute(!mute)', :type='mute ? "volume-mute" : "volume-play"')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { SET_MUTE, SET_VOLUME } from '@/store/type';

import AppIcon from '@/components/common/AppIcon.vue';

const { State, Action, Mutation } = namespace('media');

@Component({
  components: {
    AppIcon,
  },
})
export default class MediaVolume extends Vue {
  @State('volume') volume!: number;

  @State('mute') mute!: boolean;

  @Action(SET_VOLUME) setVolume!: (volume: number) => void;

  @Mutation(SET_MUTE) setMute!: (mute: boolean) => void;

  show = false;

  get value() {
    return this.mute ? 0 : this.volume;
  }

  set value(volume: number) {
    this.setVolume(volume);
  }
}
</script>

<style lang="scss" scoped>
@include b(media, volume) {
  display: flex;

  @include e(icon) {
    width: 25px;
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
