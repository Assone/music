<template>
  <div class="view-playlists">
    <div class="grid gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
      <Cover v-for="{ id, cover, name } in data" :id="id" :key="id" :src="cover" type="playlist">
        <CoverMeta v-bind="{ name }" />
      </Cover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { getPlaylist } from '@/apis';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

export default defineComponent({
  components: {
    Cover,
    CoverMeta,
  },
  setup() {
    const data = reactive<Model.Playlist[]>([]);
    const more = ref(false);
    const total = ref(0);

    getPlaylist().then((res) => {
      data.push(...res.playlists);
      more.value = res.more;
      total.value = res.total;
    });

    return {
      data,
      more,
      total,
    };
  },
});
</script>
