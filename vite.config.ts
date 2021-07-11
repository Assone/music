import { resolve } from "path";
import { cwd } from "process";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import viteSvgIcons from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: resolve(cwd(), "src/locales/**"),
    }),
    viteSvgIcons({
      iconDirs: [resolve(cwd(), "src/assets/icons")],
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: "/src/$1" }],
  },
  server: {
    host: true,
    port: 1212,
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/import.scss";`,
      },
    },
  },
});
