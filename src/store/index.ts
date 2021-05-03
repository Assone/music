import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';

import { isDev } from '@/utils/is';

import config from './modules/config';
import media from './modules/media';

Vue.use(Vuex);

export default new Vuex.Store<SRootState>({
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
  state: {
    version: '0.01',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    config,
    media,
  },
});
