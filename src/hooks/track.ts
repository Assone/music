import { getSongDetail } from '@/apis';
import MSong from '@/models/Song';
import Queue from '@/models/tools/Queue';
import { throttle } from 'lodash-es';
import { Ref, getCurrentInstance, reactive, watch, onDeactivated, onMounted } from 'vue';
import { useReachBottom } from '.';

export const useTrackListData = ({
  songs,
  trackIds,
}: {
  songs: Ref<MSong[]>;
  trackIds?: Ref<number[] | undefined>;
}) => {
  const instance = getCurrentInstance();

  const ids = new Queue<number[]>();
  const data = reactive(songs);

  watch(songs, (songs) => {
    data.value = songs;
  });

  const handleScroll = () => {
    const isReachButton = useReachBottom(instance?.proxy?.$el as HTMLElement);

    if (isReachButton) {
      if (!ids.isEmpty) handleLoadingMore();
      else window.removeEventListener('scroll', scrollListener);
    }
  };
  const handleLoadingMore = async () => {
    const id = ids.out();
    if (id) {
      const { songs } = await getSongDetail(id);
      data.value.push(...songs);
    }
  };
  const scrollListener = throttle(handleScroll, 200);

  onMounted(() => {
    if (trackIds?.value) {
      if (trackIds.value.length > 50) {
        for (let i = 0; i < trackIds.value.length; i += 50) {
          ids.in(trackIds.value.slice(i, i + 50));
        }
        window.addEventListener('scroll', scrollListener);
      } else {
        ids.in(trackIds.value);
      }

      handleLoadingMore();
    }
  });
  onDeactivated(() => window.removeEventListener('scroll', scrollListener));

  return {
    data,
  };
};
