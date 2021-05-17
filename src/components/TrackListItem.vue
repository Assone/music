<template>
  <article
    class="track-list__item"
    :class="{ 'is-album': type === 'album', 'is-disabled': disabled, 'is-active': active }"
    v-bind="$attrs"
  >
    <div class="track-item__index" v-if="type === 'album'">{{ index }}</div>
    <div class="track-item__cover" v-else>
      <Cover :src="cover" />
    </div>
    <div class="track-item__info">
      <div class="track-item__name">{{ name }}</div>
      <div class="track-item__artists" v-if="type !== 'album'">
        <span class="track-item__artists-item" v-for="{ id, name } in artists" :key="id">
          <router-link class="track-item__link" :to="`/artist/${id}`"> {{ name }}</router-link>
        </span>
      </div>
    </div>
    <div class="track-item__album" v-if="type !== 'album' && devicesType === 'pc'">
      <router-link class="track-item__link" :to="`/album/${albumId}`"> {{ albumName }}</router-link>
    </div>
    <div class="track-item__time" v-if="devicesType === 'pc'">{{ time }}</div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, PropType } from 'vue';
import { formatTime } from '@/utils/format';
import MSong from '@/models/Song';

import Cover from './Cover.vue';
import { useDevicesType } from '@/hooks/devices';

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
    disabled: Boolean,
    active: Boolean,
  },
  setup(props) {
    const { album, duration } = toRefs(props);
    const { devicesType } = useDevicesType();

    const cover = computed(() => album?.value?.cover);
    const albumId = computed(() => album?.value?.id);
    const albumName = computed(() => album?.value?.name);
    const time = computed(() => formatTime(duration?.value as number));

    return {
      devicesType,

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

    color: $--color-text;

    padding: 5px 10px;

    transition: 0.1s;

    &:hover {
      border-radius: 4px;
      background-color: hsl(var(--theme-color-h), var(--theme-color-s), 60%);
    }

    @include when(album) {
      line-height: 1.6;
    }

    @include when(active) {
      background-color: hsl(calc(var(--theme-color-h) + 20), var(--theme-color-s), 60%);
    }

    @include when(disabled) {
      filter: grayscale(1) opacity(0.6);
      opacity: 0.28;
      cursor: no-drop;

      &:hover {
        background-color: transparent;
      }
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

  @include e(name) {
    font-weight: 700;
  }

  @include e(link) {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  @include e(artists) {
    font-size: 0.6rem;
  }

  @include e(artists-item) {
    &:not(:last-child)::after {
      content: ', ';
    }
  }
}
</style>
