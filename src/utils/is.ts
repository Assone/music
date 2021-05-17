export const isDev = !import.meta.env.PROD;
export const isProd = import.meta.env.PROD;

export const isString = (val: unknown): val is string => typeof val === 'string';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isMobile = 'onorientationchange' in window;
export const isPC = !isMobile;
