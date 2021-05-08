import { NavigationGuard } from "vue-router";

const guard: NavigationGuard = (to, _from, next) => {
  const {meta} = to;

  if(meta.title) {
    document.title = meta.title as string;
  }

  next()
}

export default guard