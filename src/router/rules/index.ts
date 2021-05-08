import { RouteRecordRaw } from 'vue-router';

import source from './source';

import Home from '@/views/Home.vue';

const rules: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Error.vue'),
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      keepAlive: true,
    },
    component: Home,
  },
  ...source,
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
  },
];

export default rules;
