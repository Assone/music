<template>
  <div class="view-playlist-detail">
    <SourceMeta
      v-bind="{ cover, name, description, creator: artist }"
      type="album"
    />
    <TrackList type="album" v-bind="{ songs, isMobile }">
      <template #foot>
        <div class="text-xs leading-5">
          <p>{{ publishTime }}</p>
          <p>共{{ songs.length }}首歌曲，{{ duration }}</p>
          <p>© {{ company }}</p>
        </div>
      </template>
    </TrackList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SourceMeta from "@/components/SourceMeta.vue";
import TrackList from "@/components/TrackList.vue";

import useAlbumDetail from "@/composables/useAlbumDetail";
import useStore from "@/composables/useStore";

export default defineComponent({
  components: {
    SourceMeta,
    TrackList,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const { isMobile } = useStore();
    const {
      songs,
      name,
      cover,
      description,
      artist,
      company,
      publishTime,
      duration,
    } = await useAlbumDetail(props);

    return {
      songs,

      name,
      cover,
      description,
      artist,
      company,

      publishTime,
      duration,

      isMobile,
    };
  },
});
</script>
