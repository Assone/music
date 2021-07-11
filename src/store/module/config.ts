import { Module } from "vuex";
import { useLocalStorage } from "@vueuse/core";

import config from "@/config/app";
import { SET_THEME, SET_THEME_COLOR } from "../type";
import { useSetTheme } from "@/composables/useTheme";

const userConfig = useLocalStorage("config", config);

const module: Module<IAppConfig, {}> = {
  namespaced: true,
  state: userConfig.value,
  getters: {
    currentColor(state) {
      return state.themeColor[state.currentColorIndex];
    },
  },
  mutations: {
    [SET_THEME_COLOR](state, index) {
      state.currentColorIndex = index;
    },
    [SET_THEME](state, type) {
      state.theme = type;
      useSetTheme(type);
    },
  },
};

export default module;
