<template>
  <div
    class="
      mask
      absolute
      top-0
      right-0
      bottom-0
      left-0
      justify-center
      items-center
      flex
      opacity-0
      hover:opacity-100
    "
    @click="$emit('click')"
  >
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppIcon from "./common/AppIcon.vue";

export default defineComponent({
  components: {
    AppIcon,
  },
  emits: ["click", "click-inner"],
});
</script>
