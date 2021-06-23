<template>
  <div class="app-layout--default">
    <AppHeader
      :class="$style.header"
      class="
        sticky
        z-50
        top-0
        flex
        items-center
        gap-4
        px-4
        backdrop-filter backdrop-blur-xl backdrop-saturate-150
        dark:bg-gray-800
        bg-opacity-90
        transition
      "
      height="50px"
    >
      <slot name="head" />
    </AppHeader>
    <AppMain class="pt-4 xs:px-4 sm:px-[5vw] 2xl:px-[10vw]">
      <slot />
    </AppMain>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/common/AppHeader.vue";
import AppMain from "@/components/common/AppMain.vue";
</script>

<style lang="scss" module>
.header {
  background-color: hsla(var(--theme-color-raw), 0.8);
}
</style>
