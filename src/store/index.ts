import { InjectionKey } from 'vue';
import { createLogger, createStore, Store, useStore as baseUseStore } from 'vuex';
import { get } from 'js-cookie';

import { useDevicesType } from '@/hooks/devices';
import { isDev } from '@/utils';

import createStorage from './plugins/storage';

import config from './modules/config';
import media from './modules/media';

const store = createStore<SRootState>({
  strict: isDev,
  plugins: isDev
    ? [
        createLogger(),
        createStorage<SAllState>({
          model: ['media', 'config'],
          mutation: [
            { model: 'media', type: 'PLAY', key: 'account', ext: (state) => state.account },
          ],
        }),
      ]
    : [],
  state: {
    version: '0.01',
  },
  getters: {
    isLogin: () => get('MUSIC_U') !== undefined,
    isAccountLogin: ({ account }, getters) => (getters.isLogin && account ? true : false),
    devicesType: () => useDevicesType().devicesType,
    isMobile: () => useDevicesType().devicesType === 'mobile',
  },
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
