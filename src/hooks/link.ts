import { isExternal as isExternalCheck } from '@/utils/is';

// eslint-disable-next-line import/prefer-default-export
export const useLink = (item: IappNavItemConfig) => {
  const isExternal = isExternalCheck(item?.link ?? '');

  const props = {
    class: {
      isExternal,
    },
    href: item?.link,
    'aria-label': item?.ariaLabel,
    target: item?.target || isExternal ? '_blank' : null,
  };

  return {
    isExternal,
    props,
  };
};
