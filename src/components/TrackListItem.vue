<template>
  <div class="track-list__item flex gap-3 items-center p-2 rounded">
    <div class="text-center" :class="$style.index">
      <span v-if="showIndex">{{ index }}</span>
      <Cover v-else class="w-12" :src="cover" :alt="name" />
    </div>
    <div class="flex-1 truncate">
      <div class="font-black truncate cursor-default">
        <span :title="name">
          {{ name }}
        </span>
        <span v-if="alia" class="text-gray-500"> ({{ alia }})</span>
      </div>

      <div v-if="showArtists">
        <span v-for="{ id: artId, name: artName } in artists" :key="artId" class="track-item__artists-item">
          <AppLink class="track-item__link" :to="`/artist/${artId}`">
            {{ artName }}
          </AppLink>
        </span>
      </div>
    </div>
    <div v-if="showAlbum" class="flex-1 truncate">
      <AppLink class="track-item__link" :to="`/album/${albumId}`" :title="albumName">
        {{ albumName }}
      </AppLink>
    </div>
    <div v-if="showTime">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import { formatTime } from '@/utils';
import AppLink from './common/AppLink.vue';
import Cover from './Cover.vue';

export default defineComponent({
  components: {
    AppLink,
    Cover,
  },
  props: {
    index: Number,
    showIndex: Boolean,
    showTime: Boolean,
    showAlbum: Boolean,
    showArtists: Boolean,

    album: Object as PropType<Model.Song['album']>,
    artists: Array as PropType<Model.Song['artists']>,
    duration: Number as PropType<Model.Song['duration']>,
    id: Number as PropType<Model.Song['id']>,
    name: String as PropType<Model.Song['name']>,
    alia: String as PropType<Model.Song['alia']>,
  },
  setup(props) {
    const { album, duration } = toRefs(props);

    const cover = computed(() => album?.value?.cover);
    const albumId = computed(() => album?.value?.id);
    const albumName = computed(() => album?.value?.name);
    const time = computed(() => formatTime(duration?.value as number));

    return {
      cover,
      albumId,
      albumName,
      time,
    };
  },
});
</script>

<style lang="scss" module>
.index {
  flex-basis: 1rem;
}
</style>

<style lang="scss" scoped>
@include b(track, list) {
  @include e(item) {
    &:hover {
      background-color: hsla(var(--theme-color-raw), 0.3);
    }
  }
}
</style>
