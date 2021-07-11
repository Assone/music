<template>
  <div class="view-playlist-detail">
    <SourceMeta
      v-bind="{ cover, name, description, creator: artist }"
      type="album"
    ></SourceMeta>
    <TrackList type="album" v-bind="{ songs, isMobile }" #foot>
      <div class="text-xs leading-5">
        <p>{{ publishTime }}</p>
        <p>共{{ songs.length }}首歌曲，{{ duration }}</p>
        <p>© {{ company }}</p>
      </div>
    </TrackList>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import SourceMeta from "@/components/SourceMeta.vue";
import TrackList from "@/components/TrackList.vue";

import useStoreState from "@/composables/useStoreState";
import { getAlbumDetail } from "@/apis";
import { formatDate, formatTime } from "@/utils";

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
    const { isMobile } = useStoreState();
    const { id } = toRefs(props);

    const { album, songs } = reactive(await getAlbumDetail(id.value));
    const { name, cover, description, company, artist, time } = reactive(album);
    const publishTime = formatDate(time.publish as number, {
      locales: navigator.language,
      options: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    });
    const duration = formatTime(
      songs.reduce((pre, cur) => pre + cur.duration, 0),
      "mm分钟"
    );

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
