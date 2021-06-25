<template>
  <div class="view-album-detail">
    <SourceHead :cover="cover" :meta="{ title: name, description, type: 'album', user: artist }">
      <AppButton v-if="canPlay" @click="handlePlay">play</AppButton>
    </SourceHead>
    <TrackList :songs="songs" type="album" :activeTrack="activeTrack" @play="handleDoubleClick">
      <template #foot>
        <p>{{ publishTime }}</p>
        <p>共{{ songs.length }}首歌曲，{{ duration }}</p>
        <p>© {{ company }}</p>
      </template>
    </TrackList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { done } from 'nprogress';

import { useMediaState, useMediaControlsByView } from '@/composition/media';
import { useAlbumDetailData } from '@/composition/album';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/containers/TrackList.vue';

export default defineComponent({
  components: {
    TrackList,
    SourceHead,
    AppButton,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const { id } = toRefs(props);
    const { activeTrack } = useMediaState(id.value);
    const { play, playSpecific } = useMediaControlsByView();
    const { name, cover, description, company, artist, publishTime, duration, ids, songs } =
      await useAlbumDetailData(id.value);
    done();

    const canPlay = computed(() => songs.filter((s) => s.playable).length !== 0);

    const handlePlay = () => play({ id: id.value, ids });
    const handleDoubleClick = ({ track }: { track: number }) => {
      if (activeTrack.value) playSpecific(track);
      else play({ id: id.value, ids, track });
    };

    return {
      canPlay,

      activeTrack,
      songs,
      name,
      cover,
      description,
      company,
      artist,
      publishTime,
      duration,
      handlePlay,
      handleDoubleClick,
    };
  },
});
</script>
