<template lang="pug">
.view-playlist-detail
  SourceHead(:title='name', :cover='cover', :description='description', :user='creator')
  TrackList(v-if='track', :track-ids='track')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';
import MPlaylist from '@/models/Playlist';

@Component({
  components: {
    TrackList,
    SourceHead,
  },
})
export default class PlaylistDetail extends Vue {
  @Prop({ type: Number }) id!: number;

  model: MPlaylist | null = null;

  async created() {
    const model = await this.$api.getPlaylistDetail(this.id);

    this.model = model;
  }

  get name() {
    return this.model?.name || '';
  }

  get cover() {
    return this.model?.cover || '';
  }

  get description() {
    return this.model?.description;
  }

  get creator() {
    return this.model?.creator || {};
  }

  get track() {
    return this.model?.trackIds;
  }

  // get trackCount() {
  //   return this.model?.trackIds.length;
  // }

  // get songsDurationCount() {
  //   return this.model?.durationCount;
  // }
}
</script>
