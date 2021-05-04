<template lang="pug">
footer.app-footer(:style='{ height }')
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {
  @Prop({ type: String, default: '60px' }) height!: string;
}
</script>
