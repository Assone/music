import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean;
    transition?: string;
    title?: string;
  }
}
