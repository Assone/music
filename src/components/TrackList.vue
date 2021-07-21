<template>
  <div class="track-list">
    <div>
      <!-- playable -->
      <TrackListItem
        v-for="({ album, artists, duration, id, name, alia }, index) in data"
        :key="id"
        :index="index + 1"
        :show-index="type === 'album'"
        :show-album="type !== 'album' && !isMobile"
        :show-artists="type !== 'album'"
        :show-time="!isMobile"
        v-bind="{ album, artists, duration, id, name, alia }"
      />
    </div>
    <div class="track-list__foot">
      <slot name="foot" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  watchEffect,
  onDeactivated,
} from 'vue';
import { throttle } from 'lodash-es';

import { getSongDetail } from '@/apis';
import { useReachBottom } from '@/hooks';

import Queue from '@/models/tools/Queue';
import TrackListItem from './TrackListItem.vue';

export default defineComponent({
  components: {
    TrackListItem,
  },
  props: {
    trackIds: Array as PropType<number[]>,
    songs: {
      type: Array as PropType<Model.Song[]>,
      default: () => [],
    },
    type: {
      type: String as PropType<'playlist' | 'album'>,
      default: 'playlist',
    },
    isMobile: Boolean,
  },
  setup(props) {
    const { songs, trackIds } = toRefs(props);
    const data = reactive(songs);

    const instance = getCurrentInstance();

    const ids = new Queue<number[]>();

    watchEffect(() => {
      data.value = songs.value;
    });

    const handleLoadingMore = async () => {
      const id = ids.out();
      if (id) {
        const { songs: newSongs } = await getSongDetail(id);
        data.value.push(...newSongs);
      }
    };
    const handleScroll = () => {
      const isReachButton = useReachBottom(instance?.proxy?.$el as HTMLElement);

      if (isReachButton) {
        if (!ids.isEmpty) handleLoadingMore();
        // eslint-disable-next-line no-use-before-define
        else window.removeEventListener('scroll', scrollListener);
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
  },
});
</script>
