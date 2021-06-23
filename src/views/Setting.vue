<template>
  <div class="view-setting">
    <AppRadioGroup v-model="color" class="flex gap-x-2">
      <AppRadio label="gray" point-color="gray" />
      <AppRadio label="red" point-color="red" />
      <AppRadio label="yellow" point-color="yellow" />
      <AppRadio label="green" point-color="green" />
      <AppRadio label="blue" point-color="blue" />
      <AppRadio label="indigo" point-color="indigo" />
      <AppRadio label="purple" point-color="purple" />
      <AppRadio label="pink" point-color="pink" />
    </AppRadioGroup>
    <div>
      <select v-model="locale">
        <option
          v-for="locale in availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import AppRadio from "@/components/common/AppRadio.vue";
import AppRadioGroup from "@/components/common/AppRadioGroup.vue";

import { useStore } from "@/store";
import { SET_COLOR } from "@/store/type";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    AppRadio,
    AppRadioGroup,
  },
  setup() {
    const { locale, availableLocales } = useI18n();
    const store = useStore();

    const color = computed({
      get: () => store.state.config.color,
      set: (val) => store.commit(SET_COLOR, val),
    });

    return {
      locale,
      availableLocales,

      color,
    };
  },
});
</script>
