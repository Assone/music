<template lang="pug">
.view-top
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Top extends Vue {
  created() {
    this.$api.getTopArtistsHot();
    this.$api.getTopSong(0);
    this.$api.getTopMV();
    this.$api.getTopAllAbstract();
  }
}
</script>
