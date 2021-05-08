import { Module } from 'vuex';
import { useLocalStorage } from '@vueuse/core';

import appConfig from '@/config/app';
import { Ref } from 'vue';

const config: Module<Ref<SConfigState>, SRootState> = {
  namespaced: true,
  state: useLocalStorage('config', appConfig),
};

export default config;
