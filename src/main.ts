import { createApp } from 'vue';
import 'vite-plugin-svg-icons/register';

import App from './App.vue';
import router from './router';
import store, { key } from './store';

import './plugins/interceptors';
import i18n from './plugins/i18n';

import './styles/index.scss';
import * as api from './apis';
import { isDev } from './utils';

const app = createApp(App);

app.config.globalProperties.$api = api;
app.use(router).use(store, key).use(i18n).mount('#app');

if (isDev) {
  import('./plugins/devtools').then(({ addDevtools }) => addDevtools(app, store));
}
