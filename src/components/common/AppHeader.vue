<template lang="pug">
header.app-header
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {
  @Prop({ type: String, default: '60px' }) height!: string;
}
</script>
