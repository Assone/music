import { NavigationGuard } from 'vue-router';
import { start, configure } from 'nprogress';

configure({ showSpinner: false, trickleSpeed: 100 });

const guard: NavigationGuard = (to): void => {
  if (to.matched.some((rec) => !rec.meta.keepAlive)) start();
};

export default guard;
