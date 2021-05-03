<template lang="pug">
nav.nav-bar__links(role='navigation')
  router-link.nav-links__item(
    v-for='{ link, text } in links',
    :key='link',
    :to='link',
    active-class='is-active',
    exact
  ) {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavLink extends Vue {
  @Prop({ type: Array, required: true }) links!: { text: string; link: string }[];
}
</script>

<style lang="scss" scoped>
@include b(nav, links) {
  @include e(item) {
    margin: 0 20px;

    color: rgba(255, 255, 255, 0.5);

    @include when(active) {
      color: #fff;
    }
  }
}
</style>
