import { Module } from "vuex";

import config from "@/config/app";
import { SET_COLOR } from "../type";

const module: Module<IAppConfig, {}> = {
  state: config,
  mutations: {
    [SET_COLOR](state, color) {
      state.color = color;
    },
  },
};

export default module;
