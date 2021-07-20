<template>
  <div
    class="shadow-sm w-full h-full absolute top-1 z-0 transition transform scale-95 filter blur-lg bg-cover"
    :style="[src ? [`background-image: url(${src})`] : '']"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: String,
  },
});
</script>
