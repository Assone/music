type SizeType = { width: number; height: number };

const scrollElement =
  document.scrollingElement || document.body || document.documentElement;

/**
 * 获取视图大小
 * @returns 返回窗口宽高
 */
export const useViewSize = (): SizeType => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * 获取元素大小
 * @param element 要获取的元素对象
 * @returns 返回元素的可视宽高
 */
export const useElementSize = (element: Element): SizeType => ({
  width: element.clientWidth,
  height: element.clientHeight,
});

export const useElementOffset = (
  element: HTMLElement
): { top: number; left: number; width: number; height: number } => ({
  top: element.offsetTop,
  left: element.offsetLeft,
  width: element.offsetWidth,
  height: element.offsetHeight,
});

/**
 * 获取元素是否触底
 * @param element 要判断的元素
 * @returns 当前滚动的范围是否达到了元素的可视范围的底部
 */
export const useReachBottom = (element: HTMLElement): boolean => {
  const { height } = useElementSize(element); // 获取元素的可视高度
  const { top } = useElementOffset(element); // 获取元素顶部的视图高度
  const { scrollTop, clientHeight } = scrollElement; // 获取窗口的滚动高度和可视高度

  return scrollTop + clientHeight >= height + top;
};
