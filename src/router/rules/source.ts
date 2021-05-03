import Vue, { ComponentOptions } from 'vue';
import { RouteConfig } from 'vue-router';

const Shuttle: ComponentOptions<Vue> = {
  name: 'Shuttle',
  render: (h) => h('router-view'),
};

const rules: RouteConfig[] = [
  {
    path: '/playlist',
    component: Shuttle,
    children: [
      {
        path: '',
        name: 'Playlist',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Error.vue'),
      },
      {
        path: ':id',
        name: 'Playlist Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () =>
          import(/* webpackChunkName: "playlist-detail" */ '@/views/PlaylistDetail.vue'),
      },
    ],
  },
  {
    path: '/album',
    component: Shuttle,
    children: [
      {
        path: '',
        name: 'Albums',
        component: () => import(/* webpackChunkName: "albums" */ '@/views/Albums.vue'),
      },
      {
        path: ':id',
        name: 'Album Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import(/* webpackChunkName: "album-detail" */ '@/views/AlbumDetail.vue'),
      },
    ],
  },
  {
    path: '/artist',
    component: Shuttle,
    children: [
      {
        path: '',
        name: 'Artists',
        component: () => import(/* webpackChunkName: "artists" */ '@/views/Artists.vue'),
      },
      {
        path: ':id',
        name: 'Artist Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import(/* webpackChunkName: "artist-detail" */ '@/views/ArtistDetail.vue'),
      },
    ],
  },
  {
    path: '/top',
    name: 'Top',
    component: () => import(/* webpackChunkName: "top" */ '@/views/Top.vue'),
  },
  {
    path: '/mv',
    component: Shuttle,
    children: [
      {
        path: ':id',
        name: 'MV Detail',
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import(/* webpackChunkName: "mv-detail" */ '@/views/MvDetail.vue'),
      },
    ],
  },
];

export default rules;
