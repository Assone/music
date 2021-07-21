<template>
  <div class="truncate">
    <AppLink v-if="id" class="font-bold" :to="`/${type}/${id}`">
      {{ name }}
    </AppLink>
  </div>
  <div v-if="artists" class="truncate text-xs text-gray-500">
    <span v-for="{ id: artId, name: artName } in artists" :key="artId" class="artists-item">
      <AppLink :to="`/artist/${artId}`">{{ artName }}</AppLink>
    </span>
  </div>
  <div v-if="date || albumType" class="text-xs text-gray-500">
    <span v-if="date" class="album-info">{{ formatDate }}</span>
    <time v-if="albumType" class="album-info">{{ formatType }}</time>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, toRefs } from 'vue';

import { isString } from '@/utils';

import AppLink from './common/AppLink.vue';

export default defineComponent({
  components: {
    AppLink,
  },
  props: {
    name: String,
    artists: Array as PropType<{ id: number; name: string }[]>,
    date: [String, Number],
    size: Number,
    albumType: String,
  },
  setup(props) {
    const { date, size, albumType } = toRefs(props);
    const id = inject('id');
    const type = inject('type');

    const formatDate = computed(() => {
      // date?.value ? (isString(date.value) ? date.value : new Date(date.value).getFullYear()) : undefined
      if (date.value) {
        return isString(date.value) ? date.value : new Date(date.value).getFullYear();
      }

      return undefined;
    });

    const formatType = computed(() => {
      if (albumType?.value) {
        switch (albumType.value) {
          case 'EP':
          case 'EP/Single':
            return size?.value === 1 ? 'Single' : 'EP';
          case 'Single':
            return 'Single';
          default:
            return albumType.value;
        }
      }

      return undefined;
    });

    return {
      id,
      type,
      formatDate,
      formatType,
    };
  },
});
</script>

<style lang="scss">
@include b(artists, item) {
  &::after {
    content: ', ';
  }

  &:last-child::after {
    content: '';
  }
}

@include b(album, info) {
  &::after {
    content: ' · ';
  }

  &:last-child::after {
    content: '';
  }
}
</style>
