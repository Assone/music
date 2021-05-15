<template>
  <nav class="nav-bar__links">
    <router-link class="links-item" v-for="{ text, link } in links" :key="link" :to="link"
      >{{ text }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    links: {
      type: Array as PropType<IConfigNavLink[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.nav-bar__links {
  margin: 0 20px;
}

@include b(links, item) {
  // font-size: 1.3rem;
  font-weight: 600;
  color: var(--c-text);

  & + & {
    margin: 0 10px;
  }

  &::hover {
    text-decoration: none;
  }
}
</style>
