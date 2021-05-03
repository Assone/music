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
  TrackList(:songs='songs', type='album', #foot)
    p 共{{ songs.length }}首，{{ duration }}
    p &copy; {{ company }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';

import MAlbum from '@/models/Album';
import MSong from '@/models/Song';

import { formatDate, formatTime } from '@/utils/format';

const { Action } = namespace('media');

@Component({
  components: {
    TrackList,
    SourceHead,
    AppButton,
  },
})
export default class AlbumDetail extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  @Action('PLAY') play!: (ids: number[]) => void;

  model: MAlbum | null = null;

  songs: MSong[] = [];

  async created() {
    const { album, songs } = await this.$api.getAlbumDetail(this.id);

    this.model = album;
    this.songs = songs;
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
    this.play(this.songs.map((song) => song.id));
  }
}
</script>
