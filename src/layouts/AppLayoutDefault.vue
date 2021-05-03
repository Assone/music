<template lang="pug">
.app-layout--default
  slot(name='head')
  main
    slot
  footer(v-if='$slots.foot')
    slot(name='foot')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppLayoutDefault extends Vue {}
</script>

<style lang="scss" scoped>
main {
  margin-top: 5vh;

  padding: {
    right: 10vw;
    left: 10vw;
  }
}
</style>
