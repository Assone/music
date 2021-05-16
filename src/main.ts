import { createApp } from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import 'vite-plugin-svg-icons/register';

import App from './App.vue';
import router from './router';
import store, { key } from './store';

import './plugins/interceptors';

import './styles/index.scss';
import i18n from './plugins/i18n';
import { isProd } from './utils';

const app = createApp(App);
app.use(router).use(store, key).use(i18n).mount('#app');

if (isProd) {
  Sentry.init({
    dsn: 'https://2adfdf38a00d4fdfa69e38298e3ee9a1@o571492.ingest.sentry.io/5719799',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  app.config.errorHandler = (err) => {
    Sentry.captureException(err);
  };

  window.addEventListener('error', (err) => {
    Sentry.captureException(err);
  });

  window.addEventListener('unhandledrejection', (err) => {
    Sentry.captureException(err);
  });
}
