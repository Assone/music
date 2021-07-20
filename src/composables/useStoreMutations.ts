import { useStore } from '@/store';

export default function useStoreMutations() {
  const store = useStore();

  const setTheme = (type: IAppConfig['theme']) => {
    store.commit('config/SET_THEME', type);
  };

  return {
    setTheme,
  };
}
