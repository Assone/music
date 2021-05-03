<template lang="pug">
.cover
  .cover-container(@click='toDetail')
    AppImage.cover-container__image(
      v-bind='$attrs',
      lazy,
      @contextmenu.prevent='$emit("menu", $event)',
      :class='{ "can-click": canTo, "is-square": square }',
      fit='cover'
    )
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppImage from './common/AppImage.vue';

@Component({
  inheritAttrs: false,
  components: {
    AppImage,
  },
})
export default class Cover extends Vue {
  @Prop({ type: Number }) id!: number;

  @Prop({ type: Boolean }) square?: boolean;

  @Prop({ type: String, validator: (type) => ['playlist', 'album', 'mv'].includes(type) }) type!:
    | 'playlist'
    | 'album'
    | 'mv';

  get canTo() {
    return this.type !== undefined && this.id !== undefined;
  }

  toDetail() {
    if (this.canTo) this.$router.push(`/${this.type}/${this.id}`);
  }
}
</script>

<style lang="scss" scoped>
%size {
  width: 100%;
  height: 100%;
}

@include b(cover) {
  @extend %size;
}

@include b(cover, container) {
  @extend %size;

  @include e(image) {
    border-radius: 6px;

    @extend %size;

    @include can(click) {
      cursor: pointer;
    }

    @include when(square) {
      aspect-ratio: 16 / 9;
    }
  }
}
</style>
