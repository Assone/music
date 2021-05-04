<template lang="pug">
.view-playlist-detail
  SourceHead(:title='name', :cover='cover', :description='description', :user='creator')
    AppButton(@click='handlePlay') play
  TrackList(v-if='track', :track-ids='track')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { done } from 'nprogress';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';
import MPlaylist from '@/models/Playlist';

const { Action } = namespace('media');

@Component({
  components: {
    AppButton,
    TrackList,
    SourceHead,
  },
})
export default class PlaylistDetail extends Vue {
  @Action('PLAY') play!: (ids: number[]) => void;

  @Prop({ type: Number }) id!: number;

  model: MPlaylist | null = null;

  async created() {
    const model = await this.$api.getPlaylistDetail(this.id);

    this.model = model;
    done();
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

  handlePlay() {
    if (this.track) this.play(this.track);
  }

  // get trackCount() {
  //   return this.model?.trackIds.length;
  // }

  // get songsDurationCount() {
  //   return this.model?.durationCount;
  // }
}
</script>
