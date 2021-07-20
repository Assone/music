<template>
  <div class="content-container overflow-auto pb-4" :class="$attrs.class">
    <ContentContainerHead v-bind="{ ...$attrs, class: {} }">
      <slot name="head" />
    </ContentContainerHead>
    <AppSection :class="containerClass">
      <slot />
    </AppSection>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppSection from './common/AppSection.vue';
import ContentContainerHead from './ContentContainerHead.vue';

export default defineComponent({
  components: {
    AppSection,
    ContentContainerHead,
  },
  inheritAttrs: false,
  props: {
    containerClass: String,
  },
});
</script>
