<template lang="pug">
section
  slot(name='head')
    h2(v-if='title') {{ title }}
  .app-section__container(:class='containerClassName')
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppSection extends Vue {
  @Prop({ type: String }) title?: string;

  @Prop({ type: [String, Array] }) containerClassName?: string | string[];
}
</script>
