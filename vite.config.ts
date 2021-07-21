import { resolve } from 'path';
import { cwd } from 'process';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { VitePWA } from 'vite-plugin-pwa';
import { imagetools } from 'vite-imagetools';
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';
import viteTips from 'vite-plugin-tips';
import mkcert from 'vite-plugin-mkcert';
import beep from '@rollup/plugin-beep';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    beep(),
    mkcert({ source: 'coding' }),
    command === 'serve' ? viteTips() : '',
    vue(),
    vueI18n({
      include: resolve(cwd(), 'src/locales/**'),
    }),
    viteSvgIcons({
      iconDirs: [resolve(cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    imagetools(),
    legacy(),
    viteCompression(),
    viteCompression({
      ext: '.br',
      algorithm: 'brotliCompress',
    }),
  ],
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: '/src/$1' }],
  },
  server: {
    https: true,
    host: true,
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
}));
