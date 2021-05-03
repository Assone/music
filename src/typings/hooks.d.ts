/* eslint-disable no-shadow */
import { VNode } from 'vue';
import { Route } from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    beforeCreate?(this: Vue): void;
    created?(): void;
    beforeMount?(): void;
    mounted?(): void;
    beforeDestroy?(): void;
    destroyed?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    activated?(): void;
    deactivated?(): void;
    render?(createElement: CreateElement): VNode;
    errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;
    serverPrefetch?(this: Vue): Promise<void>;

    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void,
    ): void;

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void,
    ): void;

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void,
    ): void;
  }
}
