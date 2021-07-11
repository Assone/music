<template>
  <div class="view-setting">
    <div>
      <AppButonGroup>
        <AppButton v-for="item in theme" :key="item" @click="setTheme(item)">{{
          item
        }}</AppButton>
      </AppButonGroup>
    </div>
    <div class="flex gap-8">
      <h2>主题色</h2>
      <AppRadioGroup v-model="color" class="flex gap-x-2">
        <AppRadio
          v-for="item in themeColor"
          :key="item"
          :label="item"
          :point-color="`hsl(${item})`"
        />
      </AppRadioGroup>
    </div>
    <div class="flex gap-8">
      <h2>语言设置</h2>
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import AppRadio from "@/components/common/AppRadio.vue";
import AppRadioGroup from "@/components/common/AppRadioGroup.vue";
import AppButton from "@/components/common/AppButton.vue";
import AppButtonGroup from "@/components/common/AppButtonGroup.vue";

import useStoreState from "@/composables/useStoreState";
import useStoreMutations from "@/composables/useStoreMutations";

export default defineComponent({
  components: {
    AppRadio,
    AppRadioGroup,
    AppButton,
    AppButtonGroup,
  },
  setup() {
    const { locale, availableLocales } = useI18n();
    const { color, themeColor } = useStoreState();
    const { setTheme } = useStoreMutations();

    const theme: ["auto", "light", "dark"] = ["auto", "light", "dark"];

    return {
      locale,
      availableLocales,

      theme,
      themeColor,
      color,

      setTheme,
    };
  },
});
</script>
