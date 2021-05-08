<template lang="pug">
.view-playlist-detail 
  SourceHead(
    :cover='cover',
    :meta='{ title: name, description, type: "playlist", user: creator }'
  )
    AppButton(@click='handlePlay') play
  TrackList(
    v-if='tracks',
    :track-ids='tracks',
    type='playlist',
    :activeTrack='activeTrack',
    @dbclick='handleDoubleClick',
  )
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { done } from 'nprogress';

import { usePlaylistDetailData } from '@/hooks/playlist';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';

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

<style></style>
