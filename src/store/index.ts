import {
  createStore,
  createLogger,
  Store,
  useStore as baseUseStore,
  DispatchOptions,
  CommitOptions,
} from "vuex";
import { InjectionKey } from "vue";

import { useSetTheme } from "@/composables/useTheme";
import { isDev, isMobile } from "@/utils";

import config from "./module/config";
import media from "./module/media";
import * as type from "./type";

const modules = {
  config,
  media,
};

type CommitType =
  | `${keyof typeof modules}/${keyof typeof type}`
  | `${keyof typeof type}`;

interface Payload {
  type: CommitType;
}

interface DispatchExtends {
  (type: CommitType, payload?: any, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(
    payloadWithType: P,
    options?: DispatchOptions
  ): Promise<any>;
}

interface CommitExtends {
  (type: CommitType, payload?: any, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

interface StoreExtends<S> extends Store<S> {
  dispatch: DispatchExtends;
  commit: CommitExtends;
}

const store = createStore<{ account: null | { vipType: number } }>({
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
  state() {
    return {
      account: null,
    };
  },
  getters: {
    isMobile: () => isMobile,
  },
  modules,
}) as StoreExtends<{ account: null | { vipType: number }; config: IAppConfig }>;

useSetTheme(store.state.config.theme);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    useSetTheme(store.state.config.theme);
  });

export const key: InjectionKey<StoreExtends<{ config: IAppConfig }>> = Symbol();
export const useStore = (): StoreExtends<{ config: IAppConfig }> =>
  baseUseStore(key);
export default store;
