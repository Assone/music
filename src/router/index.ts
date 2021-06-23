import { createRouter, createWebHistory } from "vue-router";

import defaultRouter from "./rules/default";
import sourceRouter from "./rules/source";
import userRouter from "./rules/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRouter, ...sourceRouter, ...userRouter],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    return savedPosition ? savedPosition : { top: 0 };
  },
});

export default router;
