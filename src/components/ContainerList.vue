<template>
  <AppBanner v-if="isMobile" :options="options" :data="data" #default="item">
    <slot v-bind="item" />
  </AppBanner>
  <template v-else>
    <slot v-for="(item, index) in data" :key="index" v-bind="item" />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppBanner, { Options } from "./common/AppBanner.vue";
import Cover from "./Cover.vue";

export default defineComponent({
  components: {
    AppBanner,
    Cover,
  },
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
    },
    isMobile: Boolean,
  },
});
</script>
