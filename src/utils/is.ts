const mobileReg =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;

export const isDev = !import.meta.env.PROD;
export const isProd = import.meta.env.PROD;

export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isNumber = (val: unknown): val is number =>
  typeof val === "number";
export const isUndefined = (val: unknown) => val === undefined;
export const isNull = (val: number) => val === null;
export const { isArray } = Array;

export const isMobile =
  mobileReg.test(navigator.userAgent) || "onorientationchange" in window;
export const isPC = !isMobile;
