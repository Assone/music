<template>
  <article :class="['track-list__item', { 'is-album': type === 'album' }]" v-bind="$attrs">
    <div class="track-item__index" v-if="type === 'album'">{{ index }}</div>
    <div class="track-item__cover" v-else>
      <Cover :src="cover" />
    </div>
    <div class="track-item__info">
      <div class="track-item__name">{{ name }}</div>
      <div class="track-item__artists" v-if="type !== 'album'">
        <span class="track-item__artists-item" v-for="{ id, name } in artists" :key="id">
          <router-link :to="`/artist/${id}`"> {{ name }}</router-link>
        </span>
      </div>
    </div>
    <div class="track-item__album" v-if="type !== 'album'">
      <router-link :to="`/album/${albumId}`"> {{ albumName }}</router-link>
    </div>
    <div class="track-item__time">{{ time }}</div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, PropType } from 'vue';
import { formatTime } from '@/utils/format';
import MSong from '@/models/Song';

import Cover from './Cover.vue';

export default defineComponent({
  components: {
    Cover,
  },
  props: {
    album: {
      type: Object as PropType<MSong['album']>,
    },
    artists: {
      type: Array as PropType<MSong['artists']>,
    },
    duration: {
      type: Number as PropType<MSong['duration']>,
    },
    id: {
      type: Number as PropType<MSong['id']>,
    },
    name: {
      type: String as PropType<MSong['name']>,
    },
    type: {
      type: String as PropType<'playlist' | 'album'>,
    },
    index: Number,
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

<style lang="scss" scoped>
@include b(track, list) {
  @include e(item) {
    display: flex;
    align-items: center;
    user-select: none;

    padding: 5px 10px;

    transition: 0.1s;

    &:hover {
      background: #f00;
    }

    @include when(album) {
      line-height: 1.6;
    }
  }
}

@include b(track, item) {
  &__info,
  &__album {
    flex: 1;
  }

  @include e(cover) {
    width: 3vw;
    margin-right: 10px;

    @include media(xs) {
      width: 15vw;
    }
  }

  @include e(index) {
    flex-basis: 1rem;

    margin-right: 1rem;

    text-align: center;
  }

  @include e(artists-item) {
    &:not(:last-child)::after {
      content: ', ';
    }
  }
}
</style>
