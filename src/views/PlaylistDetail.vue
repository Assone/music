<template>
  <div class="view-playlist-detail">
    <SourceMeta
      v-bind="{ cover, name, description, creator }"
      type="playlist"
      @play="handlePlay"
    />
    <TrackList v-bind="{ trackIds, isMobile }" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";

import SourceMeta from "@/components/SourceMeta.vue";
import TrackList from "@/components/TrackList.vue";

import { getPlaylistDetail } from "@/apis";
import { useStore } from "@/store";

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
    const store = useStore();
    const { id } = toRefs(props);
    const { name, cover, description, creator, trackIds, time } = reactive(
      await getPlaylistDetail(id.value)
    );

    const isMobile = computed(() => store.getters.isMobile);
    const handlePlay = () => {
      store.commit("media/SET_AUDIO_TRACKS", trackIds);
    };

    return {
      name,
      cover,
      description,
      creator,
      trackIds,
      time,

      isMobile,

      handlePlay,
    };
  },
});
</script>
