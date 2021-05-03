<template lang="pug">
audio(ref='self', v-on='$listeners')
  p Your browser does not support the #[code audio] element.
</template>

<script lang="ts">
import { Component, Prop, Watch, Ref, Vue } from 'vue-property-decorator';

@Component
export default class MediaAudioCore extends Vue {
  @Ref('self') self!: HTMLAudioElement;

  @Prop({ type: Number }) track?: number;

  @Prop({ type: Boolean, required: true }) status!: boolean;

  @Prop({ type: Number }) volume!: number;

  @Prop({ type: Boolean }) mute!: boolean;

  @Watch('volume')
  handleVolume(volume: number) {
    this.self.volume = volume;
  }

  @Watch('mute')
  handleMute(mute: boolean) {
    this.self.muted = mute;
  }

  @Watch('track')
  async handleTrackChange(id: number) {
    const [{ url }] = await this.$api.getSongUrl(id);

    this.self.src = url;

    if (this.status) this.self.play();
  }

  @Watch('status')
  syncPlayStatus(status: boolean) {
    if (status) this.self.play();
    else this.self.pause();
  }

  setCurrentTime(time: number) {
    this.self.currentTime = time;
  }
}
</script>
