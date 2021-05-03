import { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

import source from './source';
import user from './user';

const rules: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: true,
    },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import(/* webpackChunkName: "explore" */ '@/views/Explore.vue'),
  },
  ...source,
  ...user,
  {
    path: '*',
    name: 'Error',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Error.vue'),
  },
];

export default rules;
