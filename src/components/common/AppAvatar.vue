<template lang="pug">
article.app-avatar(:class='avatarClass', :style='avatarStyle')
  AppIcon(v-if='icon', :type='icon')
  slot(v-else)
    AppImage(v-bind='$attrs')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
  components: {
    AppImage: () => import('./AppImage.vue'),
    AppIcon: () => import('./AppIcon.vue'),
  },
})
export default class AppAvatar extends Vue {
  @Prop({ type: String }) icon?: string;

  @Prop({
    type: [String, Number],
    validator: (size) =>
      typeof size === 'string'
        ? ['large', 'medium', 'small'].includes(size)
        : typeof size === 'number',
  })
  size?: 'large' | 'medium' | 'small' | number;

  @Prop({
    type: String,
    default: 'circle',
    validator: (shape) => ['circle', 'square'].includes(shape),
  })
  shape?: 'circle' | 'square';

  get avatarClass() {
    const list: string[] = [];

    if (typeof this.size === 'string') list.push(`app-avatar--${this.size}`);
    if (this.icon) list.push(`app-avatar--icon`);
    if (this.shape) list.push(`app-avatar--${this.shape}`);

    return list;
  }

  get avatarStyle() {
    return typeof this.size === 'number'
      ? { width: `${this.size}px`, height: `${this.size}px`, lineHeight: `${this.size}px` }
      : {};
  }
}
</script>

<style lang="scss" scoped>
@include b(app, avatar) {
  display: inline-block;

  width: 40px;
  height: 40px;

  line-height: 40px;
  text-align: center;

  overflow: hidden;

  @include m(circle) {
    border-radius: 50%;
  }

  @include m(square) {
    border-radius: 4px;
  }

  @include m(icon) {
    font-size: 18px;
  }

  @include m(large) {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  @include m(medium) {
    width: 36px;
    height: 36px;
    line-height: 36px;
  }

  @include m(small) {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
}
</style>
