<template>
  <component
    :is="layout"
    :style="[
      `--theme-color-raw: ${themeColorRaw}`,
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
    <suspense>
      <template #fallback>
        <div>Loading...</div>
      </template>
      <router-view />
    </suspense>
  </component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";

import NavBarTitle from "@/components/NavBarTitle.vue";
import NavBarLinks from "@/components/NavBarLinks.vue";

import { useStore } from "@/store";

export default defineComponent({
  components: {
    Default: defineAsyncComponent(() => import("./Default.vue")),
    NavBarTitle,
    NavBarLinks,
  },
  setup() {
    const store = useStore();

    const logo = computed(() => store.state.config.logo);
    const links = computed(() => store.state.config.nav);
    const title = computed(() => store.state.config.title);
    const layout = computed(() => store.state.config.layout || "Default");
    const color = computed(() => store.state.config.color);

    const themeColorRaw = computed(() => {
      switch (color.value) {
        case "gray":
          return "220, 9%, 46%";
        case "red":
          return "0, 84%, 60%";
        case "yellow":
          return "38, 92%, 50%";
        case "green":
          return "160, 84%, 39%";
        case "blue":
          return "217, 91%, 60%";
        case "indigo":
          return "239, 84%, 67%";
        case "purple":
          return "258, 90%, 66%";
      }

      return "";
    });
    const themeColorHSL = computed(() => {
      const [h, s, l] = themeColorRaw.value.split(", ");

      return {
        h,
        s,
        l,
      };
    });

    return { logo, title, links, layout, color, themeColorRaw, themeColorHSL };
  },
});
</script>

<style module>
.layout {
  --theme-color: hsl(var(--theme-color-raw));
  min-height: 100vh;
}
</style>
