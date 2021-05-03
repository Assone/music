// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/ban-types
export const run = <T = unknown>(data: unknown, ...fns: Function[]): T =>
  fns.reduce((result, current) => current(result), data) as T;

export const usePhotoResize = (x: number, y: number) => (path: string | undefined): string =>
  `${path}?param=${x}y${y}`;

/**
 * 防抖函数，根据上次调用后延迟特定毫秒再执行方法
 * @param fn 要执行的方法
 * @param wait 等待时间
 * @returns 防抖函数包装过的函数
 */
export const debounce = (fn: () => void, wait = 0): (() => void) => {
  let timeID: null | NodeJS.Timeout;

  return function wrapper(this: unknown, ...args: []) {
    if (timeID) {
      clearTimeout(timeID);
      timeID = null;
    }

    timeID = setTimeout(() => fn.apply(this, args), wait);
  };
};

/**
 * 节流函数，在指定时间内只执行一次的函数
 * @param fn 要执行的方法
 * @param wait 等待时间
 * @returns 节流函数包装过的函数
 */
export const throttle = (fn: () => void, wait = 0): (() => void) => {
  let timeID: null | NodeJS.Timeout;
  let lastTime = 0;

  return function wrapper(this: unknown, ...args: []) {
    const currentTime = Date.now();

    if (currentTime >= lastTime + wait) {
      fn.apply(this, args);
      lastTime = currentTime;
    } else {
      if (timeID) {
        clearTimeout(timeID);
        timeID = null;
      }

      timeID = setTimeout(fn.bind(this, args), wait);
    }
  };
};
