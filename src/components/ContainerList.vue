<template>
  <AppBanner v-if="isMobile" v-slot="item" :options="options" :data="data">
    <slot v-bind="item" />
  </AppBanner>
  <template v-else>
    <slot v-for="(item, index) in data" :key="index" v-bind="item" />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AppBanner, { Options } from './common/AppBanner.vue';

export default defineComponent({
  components: {
    AppBanner,
  },
  props: {
    data: {
      type: Array as PropType<unknown[]>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
    },
    isMobile: Boolean,
  },
});
</script>
