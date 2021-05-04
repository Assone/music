import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './rules';

import meta from './guards/meta';
import loading from './guards/loading';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { selector: to.hash, behavior: 'smooth' };

    return { x: 0, y: 0 };
  },
});

router.beforeEach(meta);
router.afterEach(loading);

export default router;
