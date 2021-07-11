<template>
  <component
    :is="layout"
    :style="[
      `--theme-color-raw: ${color}`,
      `--theme-color-h: ${themeColorHSL.h}`,
      `--theme-color-s: ${themeColorHSL.s}`,
      `--theme-color-l: ${themeColorHSL.l}`,
    ]"
    :class="$style.layout"
    class="dark:bg-gray-900 dark:text-white"
  >
    <template #head>
      <NavBarTitle v-bind="{ title, logo }" />
      <NavBarLinks :links="links" />
    </template>
    <router-view v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
      </suspense>
    </router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";

import NavBarTitle from "@/components/NavBarTitle.vue";
import NavBarLinks from "@/components/NavBarLinks.vue";

import { useRoute } from "vue-router";
import useStoreState from "@/composables/useStoreState";
import { useThemeColorHSL } from "@/composables/useTheme";

export default defineComponent({
  components: {
    Default: defineAsyncComponent(() => import("./Default.vue")),
    NavBarTitle,
    NavBarLinks,
  },
  setup() {
    const route = useRoute();
    const { color, logo, layout, title, links } = useStoreState();

    const keepAlive = computed(() => route.meta.keepAlive);

    const themeColorHSL = useThemeColorHSL(color);

    return {
      logo,
      title,
      links,
      layout,
      color,
      themeColorHSL,
      keepAlive,
    };
  },
});
</script>

<style module>
.layout {
  --theme-color: hsl(var(--theme-color-raw));
  min-height: 100vh;
}
</style>
