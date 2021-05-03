<template lang="pug">
menu.app-menu(
  v-show='show',
  :style='{ "--menu-x": x, "--menu-y": y }',
  tabindex='-1',
  ref='self',
  @contextmenu.prevent='',
  @blur='handleClose',
  @click='handleClose'
)
  .app-menu__inner
    slot
</template>

<script lang="ts">
import { useMousePosition } from '@/hooks';
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';

@Component
export default class AppMenu extends Vue {
  @Ref('self') self!: HTMLMenuElement;

  @Prop({ type: Boolean }) lock?: boolean;

  show = false;

  x = '0px';

  y = '0px';

  handleClose() {
    this.show = false;
    if (this.lock) document.body.style.overflow = '';
  }

  handleOpen(evt: MouseEvent) {
    evt.preventDefault();
    this.show = true;

    const { x, y } = useMousePosition(evt);
    this.x = `${x + 15}px`;
    this.y = `${y - 15}px`;

    this.$nextTick(() => this.self.focus());
    if (this.lock) document.body.style.overflow = 'hidden';
  }

  created() {
    if (!this.lock) window.addEventListener('scroll', () => this.handleClose());
  }
}
</script>

<style lang="scss" scoped>
@include b(app, menu) {
  position: fixed;
  top: var(--menu-y);
  left: var(--menu-x);
  z-index: 9999;
  overflow: hidden;

  padding: 1rem;
  min-width: 120px;

  backdrop-filter: blur(12px);

  &:focus {
    outline: none;
  }

  @include e(inner) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
