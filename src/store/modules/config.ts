import { Module } from 'vuex';

import appConfig from '@/config/app';

const config: Module<SConfigState, SRootState> = {
  namespaced: true,
  state: appConfig,
};

export default config;
