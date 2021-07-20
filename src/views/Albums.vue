<template>
  <div class="view-albums">
    <div class="grid gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
      <Cover v-for="{ id, cover, name } in data" :id="id" :key="id" :src="cover" type="playlist">
        <CoverMeta v-bind="{ name }" />
      </Cover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { getAlbumNew } from '@/apis';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

export default defineComponent({
  components: {
    Cover,
    CoverMeta,
  },
  setup() {
    const data = reactive<Model.Album[]>([]);
    const total = ref(0);

    getAlbumNew().then((res) => {
      data.push(...res.albums);
      total.value = res.total;
    });

    return {
      data,
      total,
    };
  },
});
</script>
