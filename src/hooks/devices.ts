import { isPC } from '@/utils';

const getDisplayDirection = () =>
  window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'horizontal';

export const useDevicesType = (): { devicesType: 'pc' | 'mobile' } => {
  if (isPC) return { devicesType: 'pc' };
  const status = getDisplayDirection();
  const width =
    status === 'portrait'
      ? Math.min(window.innerWidth, window.innerHeight)
      : Math.max(window.innerWidth, window.innerHeight);

  return { devicesType: width > 1040 ? 'pc' : 'mobile' };
};
