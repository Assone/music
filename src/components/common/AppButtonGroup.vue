<template>
  <div class="app-button-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { nextTick } from "process";
import { defineComponent, InjectionKey, provide, reactive, toRefs } from "vue";

export default defineComponent({});
</script>
