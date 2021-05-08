<template lang="pug">
.view-error
  h1 404
  p view not fount
</template>

<script lang="ts">
import { done } from 'nprogress';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    done();
  },
});
</script>
