<template>
  <article class="track-list">
    <div class="track-list__container">
      <TrackListItem
        v-for="({ album, artists, duration, id, name }, index) in data"
        :key="id"
        :class="{ 'is-active': id === activeTrack }"
        :index="index + 1"
        :type="type"
        :album="album"
        :artists="artists"
        :duration="duration"
        :id="id"
        :name="name"
        @dblclick="$emit('dbclick', { index, track: id })"
      />
    </div>
    <div class="track-list__foot">
      <slot name="foot" />
    </div>
  </article>
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
