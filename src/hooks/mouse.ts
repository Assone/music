// eslint-disable-next-line import/prefer-default-export
export const useMousePosition = (evt: MouseEvent): { x: number; y: number } => ({
  x: evt.clientX || evt.x,
  y: evt.clientY || evt.y,
});
