<template>
  <div class="view-playlist-detail">
    <SourceHead
      :cover="cover"
      :meta="{ title: name, description, type: 'playlist', user: creator }"
    >
      <AppButton @click="handlePlay">play</AppButton>
    </SourceHead>
    <TrackList
      v-if="tracks"
      type="playlist"
      :track-ids="tracks"
      :activeTrack="activeTrack"
      @play="handleDoubleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { done } from 'nprogress';

import { usePlaylistDetailData } from '@/hooks/playlist';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/containers/TrackList.vue';

export default defineComponent({
  components: {
    AppButton,
    TrackList,
    SourceHead,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const { id } = toRefs(props);
    const {
      name,
      cover,
      description,
      creator,
      trackIds,
      activeTrack,
      handlePlay,
      handleDoubleClick,
    } = await usePlaylistDetailData(id.value);

    document.title = name.value;

    done();

    return {
      name,
      cover,
      description,
      creator,
      tracks: trackIds,

      activeTrack,

      handlePlay,
      handleDoubleClick,
    };
  },
});
</script>
