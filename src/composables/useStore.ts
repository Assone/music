import { computed } from "vue";
import { useStore as getStoreInstance } from "@/store";

export default function useStore() {
  const store = getStoreInstance();

  const isMobile = computed(() => store.getters.isMobile);

  const setMvTracks = (ids: number[]) =>
    store.commit("media/SET_MV_TRACKS", ids);

  return {
    isMobile,

    setMvTracks,
  };
}
