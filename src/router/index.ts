import { createRouter, createWebHistory } from 'vue-router';

import defaultRouter from './rules/default';
import sourceRouter from './rules/source';
import userRouter from './rules/user';

import auth from './guards/auth';
import transition from './guards/transition';
import { startLoading, stopLoading } from './guards/loading';

const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRouter, ...sourceRouter, ...userRouter],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return savedPosition || { top: 0 };
  },
});

router.beforeEach(auth);
router.beforeEach(startLoading);

router.afterEach(transition);
router.afterEach(stopLoading);

export default router;
