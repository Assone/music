export * from './is';
export * from './format';

export const run = <T = unknown>(data: unknown, ...fns: Function[]): T =>
  fns.reduce((result, current) => current(result), data) as T;

export const usePhotoResize =
  (x: number, y: number) =>
  (path: string | undefined): string =>
    `${path}?param=${x}y${y}`;
