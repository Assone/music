<template>
  <AppLink to="/" :aria-label="`${title}, back to home`" class="nav-bar__title">
    <img class="logo" v-if="logo" :src="logo" alt="logo" />
    {{ title }}
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
@include b(nav, bar) {
  @include e(title) {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.3rem;
    font-weight: 600;
    color: var(--c-text);

    &::hover {
      text-decoration: none;
    }
  }
}

.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
