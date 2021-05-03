<template lang="pug">
.view-user
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class User extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  created() {
    this.$api.getUserDetail(this.id);
  }
}
</script>
