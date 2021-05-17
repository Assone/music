<template>
  <article class="track-list">
    <div class="track-list__container">
      <TrackListItem
        v-for="({ album, artists, duration, id, name, playable }, index) in data"
        :key="id"
        :index="index + 1"
        :type="type"
        :album="album"
        :artists="artists"
        :duration="duration"
        :id="id"
        :name="name"
        :disabled="!playable"
        :active="id === activeTrack"
        @click="isMobile && playable ? $emit('play', { index, track: id }) : ''"
        @dblclick="playable ? $emit('play', { index, track: id }) : ''"
      />
    </div>
    <div class="track-list__foot">
      <slot name="foot" />
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import MSong from '@/models/Song';

import TrackListItem from '@/components/TrackListItem.vue';
import { useTrackListData } from '@/hooks/track';
import { useStore } from '@/store';

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
    const store = useStore();

    const isMobile = computed(() => store.getters.isMobile);

    return {
      data,

      isMobile,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(track, list) {
  @include e(foot) {
    padding: 5px 10px;
  }
}
</style>
