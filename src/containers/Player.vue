<template lang="pug">
article.player
  MediaProgress.player__progress(
    :max='duration',
    :current='currentTime',
    @change='changeCurrentTime'
  )
  MediaAudioCore(
    ref='audio',
    :track='currentTrack',
    :status='status',
    :mute='mute',
    :volume='volume',
    @play='!status && play()',
    @pause='status && pause()',
    @timeupdate='updateCurrentTIme',
    @durationchange='updateDuration'
  )
  .player__controls
    MediaControl(:status='status', :play='play', :pause='pause', :next='next', :prev='prev')
    MediaAudioInfo(v-if='currentTrack', :track='currentTrack')
    MediaVolume
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { PAUSE, PLAY, PLAY_NEXT, PLAY_PREV } from '@/store/type';
import { formatTime } from '@/utils/format';

import MediaAudioCore from '@/components/MediaAudioCore.vue';
import MediaAudioInfo from '@/components/MediaAudioInfo.vue';
import MediaProgress from '@/components/MediaProgress.vue';
import MediaControl from '@/components/MediaControl.vue';
import MediaVolume from './MediaVolume.vue';

const { State, Getter, Mutation } = namespace('media');

@Component({
  components: {
    MediaAudioCore,
    MediaAudioInfo,
    MediaProgress,
    MediaControl,
    MediaVolume,
  },
})
export default class Player extends Vue {
  @Ref('audio') audio!: MediaAudioCore;

  @State('play') status!: boolean;

  @State('mute') mute!: boolean;

  @State('volume') volume!: number;

  @Getter('currentTrack') currentTrack!: number;

  @Mutation(PLAY) play!: () => void;

  @Mutation(PAUSE) pause!: () => void;

  @Mutation(PLAY_PREV) prev!: () => void;

  @Mutation(PLAY_NEXT) next!: () => void;

  currentTime = 0;

  duration = 0;

  get formatCurrentTime() {
    return formatTime(this.currentTime * 1000);
  }

  get formatDuration() {
    return formatTime(this.duration * 1000);
  }

  changeCurrentTime(value: string) {
    this.audio.setCurrentTime(Number(value));
  }

  updateCurrentTIme(evt: Event) {
    const { target } = evt;

    this.currentTime = (target as HTMLAudioElement).currentTime;
  }

  updateDuration(evt: Event) {
    const { target } = evt;

    this.duration = (target as HTMLAudioElement).duration;
  }
}
</script>

<style lang="scss" scoped>
@include b(player) {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  @include e(progress) {
    position: absolute;
    top: -3px;
  }

  @include e(controls) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #cbd9f5;
  }
}
</style>
