<template lang="pug">
.view-library
  h1 {{ name }}
</template>

<script lang="ts">
import MProfile from '@/models/Profile';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class Library extends Vue {
  @State('user') profile!: MProfile;

  get name() {
    return this.profile.name;
  }

  get id() {
    return this.profile.id;
  }

  created() {
    this.$api.getUserPlaylist(this.id);
    this.$api.getSubArtist();
    this.$api.getSubRadio();
    this.$api.getSubMV();
    this.$api.getSubColumn();
    // this.$api.getUserPlayRecord(this.id);
  }
}
</script>
