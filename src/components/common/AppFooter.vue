<template lang="pug">
footer.app-footer(:style='{height}')
  slot
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
