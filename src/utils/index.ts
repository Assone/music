export * from './is';
export * from './format';

export const usePhotoResize =
  (x: number, y: number) =>
  (path: string | undefined): string =>
    `${path}?param=${x}y${y}`;
