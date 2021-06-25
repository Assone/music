<template>
  <div class="view-search">
    <p>default</p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { done } from 'nprogress';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => done());
  },
});
</script>
