import { SEARCH } from '@/config/path';
import { setInterceptorsRequest } from '@/libs/http';

setInterceptorsRequest((config) => {
  const { url } = config;

  // if (url === SEARCH.index) {
  //   config.params.timestamp = new Date().getTime();
  // }

  return config;
});
