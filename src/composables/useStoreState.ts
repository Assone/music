import { computed } from 'vue';
import { useStore as getStoreInstance } from '@/store';

export default function useStoreState() {
  const store = getStoreInstance();

  const logo = computed(() => store.state.config.logo);
  const links = computed(() => store.state.config.nav);
  const title = computed(() => store.state.config.title);
  const layout = computed(() => store.state.config.layout || 'Default');
  const themeColor = computed(() => store.state.config.themeColor);

  const color = computed({
    get: () => store.getters['config/currentColor'],
    set: (colorRaw: IAppConfig['themeColor'][0]) => {
      store.commit('config/SET_THEME_COLOR', themeColor.value.indexOf(colorRaw));
    },
  });
  const isMobile = computed(() => store.getters.isMobile);

  const setMvTracks = (ids: number[]) => store.commit('media/SET_MV_TRACKS', ids);

  return {
    logo,
    links,
    title,
    layout,
    color,
    themeColor,

    isMobile,

    setMvTracks,
  };
}
