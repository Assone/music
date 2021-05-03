<template lang="pug">
input.media-progress(
  type='range',
  min='0',
  :max='max',
  step='0.01',
  v-model.number='value',
  @mousedown='handleDraging',
  @mouseup='handleDragEnd',
  @touchend='handleDraging',
  :style='{ "--progress": `${(value / max) * 100}%` }'
)
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MediaProgress extends Vue {
  @Prop({ type: Number, required: true }) max!: number;

  @Prop({ type: Number, required: true }) current!: number;

  draging = false;

  lastValue = 0;

  handleDraging() {
    this.draging = true;
  }

  handleDragEnd() {
    this.$emit('change', this.value);
    setTimeout(() => {
      this.draging = false;
    }, 50);
  }

  get value() {
    return this.draging ? this.lastValue : this.current;
  }

  set value(value: number) {
    this.lastValue = value;
  }
}
</script>

<style lang="scss" scoped>
%default {
  cursor: pointer;
  appearance: none;
}

@include b(media, progress) {
  z-index: 3;

  width: 100%;

  background-color: transparent;

  @extend %default;

  &::-webkit-slider-runnable-track {
    height: 3px;

    background: {
      color: transparent;
      image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.5) var(--progress),
        rgba(0, 0, 0, 0.1) var(--progress)
      );
      repeat: no-repeat;
      position: center;
      size: 100% 3px;
    }

    @extend %default;
  }

  &::-webkit-slider-thumb {
    width: 6px;
    height: 9px;
    margin-top: -5px;

    border: 1px solid #fff;
    border-radius: 3px 3px 0 0;

    background: {
      position: center;
      color: #737373;
    }
    outline: 1px solid transparent;

    @extend %default;
  }
}
</style>
