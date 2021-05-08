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
      :class='{ "is-active": track.id === activeTrack }',
      :index='index + 1',
      :type='type',
      @dblclick='$emit("dbclick", { index, track: track.id })'
    )
  .track-list__foot #[slot(name='foot')]
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';

import MSong from '@/models/Song';

import TrackListItem from './TrackListItem.vue';
import { useTrackListData } from '@/hooks/track';

export default defineComponent({
  components: {
    TrackListItem,
  },
  props: {
    trackIds: Array as PropType<number[]>,
    type: {
      type: String as PropType<'playlist' | 'album'>,
      default: 'playlist',
    },
    songs: {
      type: Array as PropType<MSong[]>,
      default: () => [],
    },
    activeTrack: Number,
  },
  setup(props) {
    const { songs, trackIds } = toRefs(props);
    const { data } = useTrackListData({ songs, trackIds });

    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(track, list) {
  @include e(item) {
    &:nth-child(2n) {
      background: rgb(240, 240, 240);
    }

    @include when(active) {
      background: #ff0 !important;
    }
  }

  @include e(foot) {
    padding: 5px 10px;
  }
}
</style>
