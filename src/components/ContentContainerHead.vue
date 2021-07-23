<template>
  <AppHeader height="40px" class="my-4 flex justify-between items-center">
    <div>
      <h1 class="font-bold text-2xl my-6">{{ title }}</h1>
    </div>
    <slot name="more">
      <AppLink v-if="link" :to="link.href">{{ link.name }}</AppLink>
    </slot>
  </AppHeader>
</template>

<script lang="ts">
import { defineComponent, PropType, defineAsyncComponent } from 'vue';

import AppHeader from './common/AppHeader.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppLink: defineAsyncComponent(() => import('./common/AppLink.vue')),
  },
  props: {
    title: String,
    link: Object as PropType<{ href: string; name: string }>,
  },
});
</script>
