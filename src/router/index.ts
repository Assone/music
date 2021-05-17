import { createRouter, createWebHistory } from 'vue-router';

import routes from './rules';

import meta from './guards/meta';
import loading from './guards/loading';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { selector: to.hash, behavior: 'smooth' };

    return { top: 0 };
  },
});

router.beforeEach(meta);
router.beforeEach(loading);

export default router;
