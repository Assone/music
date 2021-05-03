<template lang="pug">
.explore-tabs
  AppButton.explore-tabs__item(
    v-for='{ text, url } in tabs',
    :key='url',
    @click='url ? $router.push(url) : ""',
    :disabled='!url'
  ) {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import AppButton from './common/AppButton.vue';

@Component({
  components: {
    AppButton,
  },
})
export default class ExploreTab extends Vue {
  @Prop({ type: Array, required: true }) tabs!: { url: string; text: string }[];
}
</script>

<style lang="scss" scoped>
@include b(explore, tabs) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px;
}
</style>
