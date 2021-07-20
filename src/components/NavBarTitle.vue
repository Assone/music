<template>
  <AppLink to="/" :aria-label="`${title}, back to home`" class="flex items-center font-bold text-2xl">
    <img v-if="logo" class="logo" :src="logo" alt="logo" />
    <span>{{ title }}</span>
  </AppLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppLink from './common/AppLink.vue';

export default defineComponent({
  components: {
    AppLink,
  },
  props: {
    title: String,
    logo: String,
  },
});
</script>

<style lang="scss">
.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
