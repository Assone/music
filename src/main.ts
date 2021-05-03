import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import './plugins/interceptors';
import './plugins/registerServiceWorker';
import './plugins/hooks';

import './styles/index.scss';

import App from './App.vue';
import api from './apis';
import { isDev, isProd } from './utils/is';

if (isProd) {
  Sentry.init({
    Vue,
    dsn: 'https://2adfdf38a00d4fdfa69e38298e3ee9a1@o571492.ingest.sentry.io/5719799',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

Vue.config.productionTip = isDev;
Vue.config.performance = isDev;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
