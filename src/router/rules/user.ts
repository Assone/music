import { RouteConfig } from 'vue-router';

const rules: RouteConfig[] = [
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '@/views/Setting.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/library',
    name: 'Library',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "library" */ '@/views/Library.vue'),
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import(/* webpackChunkName: "dynamic" */ '@/views/Dynamic.vue'),
  },
  {
    path: '/disabled',
    name: 'Disabled',
    component: () => import(/* webpackChunkName: "disabled" */ '@/views/Disabled.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    props: (router) => ({ id: Number(router.params.id) }),
    component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
  },
];

export default rules;
