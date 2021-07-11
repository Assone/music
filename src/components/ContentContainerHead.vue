<template>
  <AppHeader height="" class="my-4 flex justify-between items-center">
    <div>
      <h1 class="font-bold text-2xl my-6">{{ title }}</h1>
    </div>
    <slot name="more">
      <AppLink v-if="link" :to="link.href">{{ link.name }}</AppLink>
    </slot>
  </AppHeader>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppHeader from "./common/AppHeader.vue";
import AppLink from "./common/AppLink.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppLink,
  },
  props: {
    title: String,
    link: Object as PropType<{ href: string; name: string }>,
  },
});
</script>
