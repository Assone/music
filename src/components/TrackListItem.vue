<template>
  <div class="track-list__item flex gap-3 items-center p-2 rounded">
    <div class="text-center" :class="$style.index">
      <span v-if="showIndex">{{ index }}</span>
      <Cover v-else class="w-12" :src="cover" :alt="name" />
    </div>
    <div class="flex-1 truncate">
      <div class="font-bold truncate" :title="name">{{ name }}</div>
      <div v-if="showArtists">
        <span
          class="track-item__artists-item"
          v-for="{ id, name } in artists"
          :key="id"
        >
          <AppLink class="track-item__link" :to="`/artist/${id}`">
            {{ name }}
          </AppLink>
        </span>
      </div>
    </div>
    <div v-if="showAlbum" class="flex-1 truncate">
      <AppLink
        class="track-item__link"
        :to="`/album/${albumId}`"
        :title="albumName"
      >
        {{ albumName }}
      </AppLink>
    </div>
    <div v-if="showTime">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";

import AppLink from "./common/AppLink.vue";
import Cover from "./Cover.vue";

import MSong from "@/models/Song";
import { formatTime } from "@/utils";

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

    album: Object as PropType<MSong["album"]>,
    artists: Array as PropType<MSong["artists"]>,
    duration: Number as PropType<MSong["duration"]>,
    id: Number as PropType<MSong["id"]>,
    name: String as PropType<MSong["name"]>,
  },
  setup(props) {
    const { album, duration } = toRefs(props);
    // const { devicesType } = useDevicesType();

    const cover = computed(() => album?.value?.cover);
    const albumId = computed(() => album?.value?.id);
    const albumName = computed(() => album?.value?.name);
    const time = computed(() => formatTime(duration?.value as number));

    return {
      // devicesType,

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
      background-color: var(--theme-color);
    }
  }
}
</style>
