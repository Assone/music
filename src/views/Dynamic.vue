<template lang="pug">
.view-dynamic
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dynamic extends Vue {
  created() {
    this.$api.getDynamic();
  }
}
</script>
