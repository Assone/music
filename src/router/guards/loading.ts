import { Route } from 'vue-router';
import { start, configure } from 'nprogress';

configure({ showSpinner: false, trickleSpeed: 100 });

const guards = (to: Route): void => {
  if (to.matched.some((rec) => !rec.meta.keepAlive)) start();
};

export default guards;
