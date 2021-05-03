<template lang="pug">
picture.app-image
  template(v-if='source')
    source(v-for='item in source', :key='item.src', v-bind='item')
  slot(v-if='loading', name='loading')
    .app-image__loading
  slot(v-else-if='error', name='error')
    .app-image__error Error
  img.app-image__inner(
    v-else,
    :style='style',
    :src='src',
    :loading='lazy ? "lazy" : "eager"',
    v-bind='$attrs',
    v-on='$listeners'
  )
</template>

<script lang="ts">
import { useElementSize } from '@/hooks';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

// eslint-disable-next-line no-shadow
const enum Fit {
  NONE = 'none',
  CONTAIN = 'contain',
  COVER = 'cover',
  FILL = 'fill',
  SCALE_DOWN = 'scale-down',
}
const isSupperObjectFit = () => document.documentElement.style.objectFit !== undefined;

@Component({
  inheritAttrs: false,
})
export default class AppImage extends Vue {
  @Prop({ type: String }) src!: string;

  @Prop({ type: Boolean, default: false }) lazy!: boolean;

  @Prop({ type: Array }) source?: { src: string; srcset: string; type: string; media: string }[];

  @Prop({ type: String }) fit?: Fit;

  loading = true;

  error = false;

  width = 0;

  height = 0;

  show = !this.lazy;

  @Watch('src')
  updatePath() {
    if (this.show) this.loadImage();
  }

  loadImage() {
    this.loading = true;
    this.error = false;

    const image = new Image();
    image.addEventListener('load', () => this.handleLoad(image));
    image.addEventListener('error', this.handleError);

    Object.entries(this.$attrs).forEach(([key, value]) => image.setAttribute(key, value));
    image.src = this.src;
  }

  handleLoad(img: HTMLImageElement) {
    this.loading = false;
    this.error = false;
    this.width = img.width;
    this.height = img.height;
  }

  @Emit('error')
  handleError(evt: Event) {
    this.loading = false;
    this.error = true;

    return evt;
  }

  get style() {
    if (this.fit)
      return isSupperObjectFit() ? { 'object-fit': this.fit } : this.getImageStyle(this.fit);

    return {};
  }

  getImageStyle(options: Fit) {
    const { width: containerWidth, height: containerHeight } = useElementSize(this.$el);
    let fit = options;

    if (!containerWidth || !containerHeight || !this.width || !this.height) return {};

    const vertical = this.width / this.height < 1;
    if (fit === Fit.SCALE_DOWN) {
      const isSmaller = this.width < containerWidth && this.height < containerHeight;
      fit = isSmaller ? Fit.NONE : Fit.CONTAIN;
    }

    switch (fit) {
      case Fit.NONE:
        return { width: 'auto', height: 'auto' };
      case Fit.CONTAIN:
        return vertical ? { width: 'auto' } : { height: 'auto' };
      case Fit.COVER:
        return vertical ? { height: 'auto' } : { width: 'auto' };
      default:
        return {};
    }
  }

  mounted() {
    if (this.lazy) {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.intersectionRatio > 0.5) {
                this.loadImage();
                this.show = true;
                io.unobserve(this.$el);
                io.disconnect();
              }
            }),
          { threshold: [1] },
        );

        io.observe(this.$el);
      }
    } else {
      this.loadImage();
    }
  }
}
</script>

<style lang="scss" scoped>
%size {
  width: 100%;
  height: 100%;
}

@include b(app, image) {
  position: relative;
  display: inline-block;
  overflow: hidden;

  @include e(loading) {
    background: #f5f7fa;

    @extend %size;
  }

  @include e(inner) {
    @extend %size;
  }
}
</style>
