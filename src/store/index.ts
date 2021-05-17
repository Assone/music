import { InjectionKey } from 'vue';
import { createLogger, createStore, Store, useStore as baseUseStore } from 'vuex';
import { get } from 'js-cookie';
import { useLocalStorage } from '@vueuse/core';

import { useDevicesType } from '@/hooks/devices';
import { isDev } from '@/utils';

import config from './modules/config';
import media from './modules/media';

const store = createStore<SRootState>({
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
  state: {
    version: '0.01',
    account: useLocalStorage<SRootState['account']>('account', undefined) as unknown as
      | SRootState['account']
      | undefined,
    profile: useLocalStorage<SRootState['profile']>('profile', undefined) as unknown as
      | SRootState['profile']
      | undefined,
  },
  getters: {
    isLogin: () => get('MUSIC_U') !== undefined,
    isAccountLogin: ({ account }, getters) => (getters.isLogin && account ? true : false),
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
