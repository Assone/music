<template>
  <div
    class="
      w-1/3
      h-1/3
      flex
      justify-center
      items-center
      rounded-full
      bg-gray-50 bg-opacity-10
      backdrop-filter backdrop-blur-xl backdrop-saturate-150
    "
    @click="$emit('click-inner')"
  >
    <AppIcon class="!w-14 !h-14" type="media-play" color="#ccc" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppIcon from './common/AppIcon.vue';

export default defineComponent({
  components: {
    AppIcon,
  },
  emits: ['click-inner'],
});
</script>
