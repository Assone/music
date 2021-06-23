<template>
  <footer class="app-footer" :style="{ height }">
    <slot />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    height: {
      type: String,
      default: '60px',
    },
  },
});
</script>
