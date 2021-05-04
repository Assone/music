<template lang="pug">
article.track-list
  //- article.track-list__head
  //-   .track-head__item Name
  //-   .track-head__item(v-if='type !== "album"') Album
  //-   .track-head__item Time
  .track-list__container
    TrackListItem(
      v-for='(track, index) in data',
      :key='track.id',
      v-bind='track',
      :index='index + 1',
      :type='type'
    )
  .track-list__foot #[slot(name='foot')]
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { useReachBottom } from '@/hooks';
import { throttle } from '@/utils';

import MSong from '@/models/Song';
import Queue from '@/models/tools/Queue';

import TrackListItem from './TrackListItem.vue';

@Component({
  components: {
    TrackListItem,
  },
})
export default class TrackList extends Vue {
  @Prop({ type: Array }) trackIds!: number[];

  @Prop({ type: String, default: 'playlist' }) type!: string;

  @Prop({ type: Array, default: () => [] }) songs!: MSong[];

  ids = new Queue<number[]>();

  data = this.songs;

  scrollListener = throttle(this.handleScroll, 200);

  @Watch('songs')
  asyncSongsToData(songs: MSong[]) {
    this.data = songs;
  }

  async handleLoadingMore() {
    const ids = this.ids.out();
    if (ids) {
      const { songs } = await this.$api.getSongDetail(ids);
      this.data.push(...songs);
    }
  }

  handleScroll() {
    const isReachButton = useReachBottom(this.$el as HTMLElement);

    if (isReachButton) {
      if (!this.ids.isEmpty) this.handleLoadingMore();
      else window.removeEventListener('scroll', this.scrollListener);
    }
  }

  created() {
    if (this.trackIds) {
      if (this.trackIds.length > 50) {
        for (let i = 0; i < this.trackIds.length; i += 50) {
          this.ids.in(this.trackIds.slice(i, i + 50));
        }
        window.addEventListener('scroll', this.scrollListener);
      } else {
        this.ids.in(this.trackIds);
      }

      this.handleLoadingMore();
    }
  }

  destroyed() {
    window.removeEventListener('scroll', this.scrollListener);
  }
}
</script>

<style lang="scss" scoped>
@include b(track, list) {
  @include e(item) {
    &:nth-child(2n) {
      background: rgb(240, 240, 240);
    }
  }
}
</style>
