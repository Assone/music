<template lang="pug">
.view-album-detail
  SourceHead(
    :cover='cover',
    :meta='{ title: name, description, time, type: "album", user: artist }'
  )
    AppButton(@click='handlePlay') play
  TrackList(
    :songs='songs',
    type='album',
    :activeTrack='activeTrack',
    @dbclick='handleDoubleClick',
    #foot
  )
    p 共{{ songs.length }}首，{{ duration }}
    p &copy; {{ company }}
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { done } from 'nprogress';

import { useMediaState, useMediaControlsByView } from '@/hooks/media';
import { useAlbumDetailData } from '@/hooks/album';

import AppButton from '@/components/common/AppButton.vue';
import SourceHead from '@/components/SourceHead.vue';
import TrackList from '@/components/TrackList.vue';

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
    const {
      name,
      cover,
      description,
      company,
      artist,
      publish,
      duration,
      ids,
      songs,
    } = await useAlbumDetailData(id.value);
    done();

    const handlePlay = () => play({ id: id.value, ids });
    const handleDoubleClick = ({ track }: { track: number }) => {
      if (activeTrack.value) playSpecific(track);
      else play({ id: id.value, ids, track });
    };

    return {
      activeTrack,
      songs,
      name,
      cover,
      description,
      company,
      artist,
      time: publish,
      duration,
      handlePlay,
      handleDoubleClick,
    };
  },
});
</script>
