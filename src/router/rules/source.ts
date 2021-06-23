import { h, resolveComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const SHUTTLE = {
  name: "Shuttle",
  render: () => h(resolveComponent("router-view")),
};

const rules: RouteRecordRaw[] = [
  {
    path: "/playlist",
    component: SHUTTLE,
    children: [
      {
        path: ":id",
        name: "Playlist Detail",
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import("@/views/PlaylistDetail.vue"),
      },
    ],
  },
  {
    path: "/album",
    component: SHUTTLE,
    children: [
      {
        path: ":id",
        name: "Album Detail",
        props: (router) => ({ id: Number(router.params.id) }),
        component: () => import("@/views/AlbumDetail.vue"),
      },
    ],
  },
];

export default rules;
