<template>
  <video class="h-full" :src="source" autoplay controls></video>
</template>

<script lang="ts">
import { getMVUrl } from '@/apis';
import { defineComponent, PropType, ref, toRefs, watchEffect } from 'vue';

export default defineComponent({
  props: {
    track: {
      type: Object as PropType<{ id: number; type: 'mv' | 'video' }>,
      required: true,
    },
  },
  setup(props) {
    const { track } = toRefs(props);
    const source = ref('');

    watchEffect(async () => {
      if (track.value.type === 'mv') {
        const { url } = await getMVUrl(track.value.id);
        source.value = url;
      }
    });

    return {
      source,
    };
  },
});
</script>
