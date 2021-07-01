import { RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";

const rules: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/Setting.vue"),
  },
];

export default rules;
