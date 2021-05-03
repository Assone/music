<template lang="pug">
a.app-link(
  :class='[underline && !disabled && "is-underline", { "is-disabled": disabled }]',
  :href='disabled ? null : href'
)
  span.app-link__content
    slot
    OutboundLink(v-if='isExternal')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import OutboundLink from '../icons/OutboundLink.vue';

@Component({
  components: {
    OutboundLink,
  },
})
export default class AppLink extends Vue {
  @Prop({ type: Boolean, default: true }) underline?: boolean;

  @Prop({ type: Boolean }) disabled?: boolean;

  @Prop({ type: String }) href?: boolean;

  @Prop({ type: Boolean }) isExternal?: boolean;
}
</script>

<style lang="scss" scoped>
@include b(app, link) {
  position: relative;

  text-decoration: none;

  @include when(underline) {
    &:hover::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      display: block;

      width: 100%;
      height: 1px;
      background: #288;
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
  }
}
</style>
