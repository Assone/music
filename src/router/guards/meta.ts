import { NavigationGuard } from 'vue-router';

const guards: NavigationGuard = (to, _from, next) => {
  const { meta } = to;

  if (meta.title) {
    document.title = meta.title;
  }

  next();
};

export default guards;
