<template lang="pug">
.view-album-detail
  SourceHead(
    :title='name',
    :cover='cover',
    :description='description',
    :user='artist',
    :time='time',
    type='album'
  )
    AppButton(@click='handlePlay') play
  TrackList(
    :songs='songs',
    type='album',
    :activeTrack='sourceId === id ? currentTrack : undefined',
    @dbclick='handleDoubleClick',
    #foot
  )
    p 共{{ songs.length }}首，{{ duration }}
    p &copy; {{ company }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { done } from 'nprogress';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';

import MAlbum from '@/models/Album';
import MSong from '@/models/Song';

import { formatDate, formatTime } from '@/utils/format';
import { PLAY, PLAY_SPECIFIC } from '@/store/type';

const { State, Getter, Action } = namespace('media');

@Component({
  components: {
    TrackList,
    SourceHead,
    AppButton,
  },
})
export default class AlbumDetail extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  @State('id') sourceId?: number;

  @Getter('currentTrack') currentTrack!: number;

  @Action(PLAY_SPECIFIC) playSpecific!: (index: number) => void;

  @Action(PLAY) play!: (options: { ids: number[]; id: number; track?: number }) => void;

  model: MAlbum | null = null;

  songs: MSong[] = [];

  async created() {
    const { album, songs } = await this.$api.getAlbumDetail(this.id);

    this.model = album;
    this.songs = songs;
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

  get company() {
    return this.model?.company;
  }

  get artist() {
    return this.model?.artist || {};
  }

  get time() {
    return this.model?.time.publish ? formatDate(this.model.time.publish) : undefined;
  }

  get duration() {
    return formatTime(
      this.songs.reduce((pre, cur) => pre + cur.duration, 0),
      'HH时mm分',
    );
  }

  handlePlay() {
    this.play({ id: this.id, ids: this.songs.map((song) => song.id) });
  }

  handleDoubleClick({ track }: { track: number }) {
    if (this.sourceId === this.id) this.playSpecific(track);
    else this.play({ id: this.id, ids: this.songs.map((song) => song.id), track });
  }
}
</script>
