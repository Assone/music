import {
  createStore,
  createLogger,
  Store,
  useStore as baseUseStore,
} from "vuex";
import { InjectionKey } from "vue";

import { isDev, isMobile } from "@/utils";

import config from "./module/config";
import media from "./module/media";
import * as type from "./type";

const modules = {
  config,
  media,
};

export type CommitType = `${keyof typeof modules}/${keyof typeof type}`;

const store = createStore<{ account: null | { vipType: number } }>({
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
  state() {
    return {
      account: null,
    };
  },
  getters: {
    isMobile: () => isMobile,
  },
  modules,
}) as Store<{ account: null | { vipType: number }; config: IAppConfig }>;

export const key: InjectionKey<Store<{ config: IAppConfig }>> = Symbol();
export const useStore = () => baseUseStore(key);

const setTheme = (theme: "auto" | "dark" | "light") => {
  if (theme === "auto") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }
};

setTheme(store.state.config.theme);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    setTheme(store.state.config.theme);
  });

export default store;
