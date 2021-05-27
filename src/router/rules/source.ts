import { h, resolveComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const SHUTTLE = {
  name: 'Shuttle',
  render: () => h(resolveComponent('router-view')),
};

const rules: RouteRecordRaw[] = [
  {
    path: '/album',
    component: SHUTTLE,
    children: [
      {
        path: ':id',
        name: 'Album Detail',
        meta: {
          transition: 'slide',
        },
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import('@/views/AlbumDetail.vue'),
      },
    ],
  },
  {
    path: '/playlist',
    component: SHUTTLE,
    children: [
      {
        path: ':id',
        name: 'Playlist Detail',
        meta: {
          transition: 'slide',
        },
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import('@/views/PlaylistDetail.vue'),
      },
    ],
  },
  {
    path: '/mv',
    component: SHUTTLE,
    children: [
      {
        path: ':id',
        name: 'MV Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import('@/views/MvDetail.vue'),
      },
    ],
  },
  {
    path: '/artist',
    component: SHUTTLE,
    children: [
      {
        path: ':id',
        name: 'Artist Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import('@/views/ArtistDetail.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: SHUTTLE,
    children: [
      {
        path: ':keyword',
        name: 'Search Detail',
        props: (router) => ({ keyword: router.params.keyword }),
        component: () => import('@/views/Search.vue'),
      },
    ],
  },
];

export default rules;
