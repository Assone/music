<template lang="pug">
aside.app-aside(:style='{ width }')
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppAside extends Vue {
  @Prop({ type: String, default: '300px' }) width!: string;
}
</script>
