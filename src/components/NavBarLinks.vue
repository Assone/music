<template>
  <nav>
    <AppLink class="link" v-for="{ to, text } in links" :to="to">{{
      t(text)
    }}</AppLink>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

import AppLink from "./common/AppLink.vue";

export default defineComponent({
  components: {
    AppLink,
  },
  props: {
    links: {
      type: Array as PropType<{ to: string; text: string }[]>,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<style lang="scss">
@include b(link) {
  & + & {
    margin-left: 10px;
  }
}
</style>
