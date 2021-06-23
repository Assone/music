<template>
  <div class="content-container overflow-auto" :class="$attrs.class">
    <slot name="head">
      <ContentContainerHead v-bind="{ ...$attrs, class: {} }" />
    </slot>
    <AppSection :class="containerClass">
      <slot />
    </AppSection>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppSection from "./common/AppSection.vue";
import ContentContainerHead from "./ContentContainerHead.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppSection,
    ContentContainerHead,
  },
  props: {
    containerClass: String,
  },
});
</script>
