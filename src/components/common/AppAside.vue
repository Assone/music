<template lang="pug">
aside.app-aside(:style='{ width }')
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '300px',
    },
  },
});
</script>
