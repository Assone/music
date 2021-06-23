import { createApp } from "vue";
import "vite-plugin-svg-icons/register";

import App from "./App.vue";
import "./styles/index.scss";

import store, { key } from "./store";
import router from "./router";
import i18n from "./plugins/i18n";
import "./plugins/interceptors";
import { isDev, isMobile } from "./utils";

createApp(App).use(router).use(store, key).use(i18n).mount("#app");

if (isDev && isMobile) {
  import("vconsole").then((VConsole) => {
    new VConsole.default();
  });
}
