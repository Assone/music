<template>
  <router-link class="nav-bar__title" to="/" :aria-label="`${title}, back to home`">
    <img class="logo" v-if="logo" :src="logo" alg="logo" />
    {{ title }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    logo: String,
  },
});
</script>

<style lang="scss">
@include b(nav, bar) {
  @include e(title) {
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
