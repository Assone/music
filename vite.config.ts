import { resolve } from 'path';
import { cwd } from 'process';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import viteSvgIcons from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [resolve(cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
    legacy(),
    viteCompression(),
    viteCompression({
      ext: '.br',
      algorithm: 'brotliCompress',
    }),
    VitePWA({
      manifest: {
        display: 'fullscreen',
      },
      registerType: 'autoUpdate',
    }),
    vueI18n({
      include: resolve(cwd(), 'src/locales/**'),
    }),
  ],
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: '/src/$1' }],
  },
  server: {
    port: 8080,
    https: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
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
