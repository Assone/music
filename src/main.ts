import { createApp } from 'vue';

import 'vite-plugin-svg-icons/register';

import App from './App.vue';
import router from './router';
import store, { key } from './store';

import './plugins/interceptors';

import './styles/index.scss';
import i18n from './plugins/i18n';

createApp(App).use(router).use(store, key).use(i18n).mount('#app');
