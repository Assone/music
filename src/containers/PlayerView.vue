<template lang="pug">
transition(name="player-page")
  .player-view(v-show='show')
    p 111111
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@include b(player, view) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  background-color: #f00;

  @include transition(player-page) {
    @include direction(enter-active, leave-active) {
      transition: all 0.5s;
    }

    @include direction(enter, leave-to) {
      transform: translateY(100%);
    }
  }
}
</style>
