import { InjectionKey } from 'vue';
import { createLogger, createStore, Store, useStore as baseUseStore } from 'vuex';
import { isDev } from '@/utils';

import config from './modules/config';
import media from './modules/media';

const store = createStore({
  strict: isDev,
  plugins: [createLogger()],
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

export const key: InjectionKey<Store<SAllState>> = Symbol();

export function useStore(): Store<SAllState> {
  return baseUseStore(key);
}

export default store;
