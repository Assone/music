<template lang="pug">
.view-playlist-detail
  SourceHead(:title='name', :cover='cover', :description='description', :user='creator')
    AppButton(@click='handlePlay') play
  TrackList(
    v-if='track',
    :track-ids='track',
    :activeTrack='sourceId === id ? currentTrack : undefined',
    @dbclick='handleDoubleClick'
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { done } from 'nprogress';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';
import MPlaylist from '@/models/Playlist';
import { PLAY, PLAY_SPECIFIC } from '@/store/type';

const { State, Getter, Action } = namespace('media');

@Component({
  components: {
    AppButton,
    TrackList,
    SourceHead,
  },
})
export default class PlaylistDetail extends Vue {
  @State('id') sourceId?: number;

  @Getter('currentTrack') currentTrack!: number;

  @Action(PLAY) play!: (options: { ids: number[]; id: number; track?: number }) => void;

  @Action(PLAY_SPECIFIC) playSpecific!: (index: number) => void;

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
    if (this.track) this.play({ ids: this.track, id: this.id });
  }

  handleDoubleClick({ track }: { track: number }) {
    if (this.sourceId === this.id) this.playSpecific(track);
    else if (this.track) this.play({ id: this.id, ids: this.track, track });
  }

  // get trackCount() {
  //   return this.model?.trackIds.length;
  // }

  // get songsDurationCount() {
  //   return this.model?.durationCount;
  // }
}
</script>
