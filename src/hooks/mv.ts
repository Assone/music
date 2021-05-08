import { getMVDetail, getMVUrl, getSimilarMV } from '@/apis';
import MMV from '@/models/MV';
import MSimilarMV from '@/models/SimilarMV';
import { computed, reactive, ref, toRefs } from 'vue';

export const useMvData = () => {
  const data = reactive<{ mv: MMV | null; simi: MSimilarMV[] }>({
    mv: null,
    simi: [],
  });

  const src = ref<string | undefined>(undefined);

  const name = computed(() => data.mv?.name);
  const cover = computed(() => data.mv?.cover);
  const artist = computed(() => data.mv?.artist);
  const time = computed(() => data.mv?.time);

  const fetch = (id: number) =>
    getMVDetail(id).then((detail) => {
      data.mv = detail;

      getMVUrl(id).then(({ url }) => {
        src.value = url;
      });
      getSimilarMV(id).then((simi) => {
        data.simi = simi;
      });
    });

  return {
    ...toRefs(data),

    src,

    name,
    cover,
    artist,
    time,

    fetch,
  };
};
