<template lang="pug">
section.app-section
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
