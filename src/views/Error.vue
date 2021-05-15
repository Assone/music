<template>
  <div class="view-error">
    <h1>404</h1>
    <p>view not fount</p>
  </div>
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
