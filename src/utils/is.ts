const mobileReg = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;

const { toString } = Object.prototype;

export const isDev = !import.meta.env.PROD;
export const isProd = import.meta.env.PROD;

export const isString = (val: unknown): val is string => typeof val === 'string';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isUndefined = (val: unknown): val is undefined => val === undefined;
export const isNull = (val: unknown): val is null => val === null;
export const { isArray } = Array;
export const isFunction = (val: unknown): val is () => void => toString.call(val) === '[object Function]';

export const isMobile = mobileReg.test(navigator.userAgent) || 'onorientationchange' in window;
export const isPC = !isMobile;
