<template>
  <AppHeader height="" class="my-4">
    <h1 class="font-bold text-2xl my-6">{{ title }}</h1>
  </AppHeader>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppHeader from "./common/AppHeader.vue";

export default defineComponent({
  components: {
    AppHeader,
  },
  props: {
    title: String,
  },
});
</script>
