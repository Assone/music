<template lang="pug">
article.cover-meta
  router-link.cover-meta__name(v-if='path', :to='path') {{ name }}
  span.cover-meta__name(v-else) {{ name }}
  .cover-meta__artists(v-if='artists')
    span.artists-item(v-for='{ id, name } in artists', :key='id')
      router-link.artists-item__link(:to='`/artist/${id}`') {{ name }}
  .cover-meta__info(v-if='date || type')
    span.cover-info__type(v-if='formatType') {{ formatType }}
    time.cover-info__time(v-if='formatDate') {{ formatDate }}
</template>

<script lang="ts">
import { isString } from '@/utils';
import { computed, defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  props: {
    path: String,
    name: String,
    artists: Array as PropType<{ id: number; name: string }[]>,
    date: [String, Number],
    type: String as PropType<'EP' | 'Single' | 'EP/Single'>,
    size: Number,
  },
  setup(props) {
    const { date, type, size } = toRefs(props);

    const formatDate = computed(() => {
      return date?.value
        ? isString(date.value)
          ? date.value
          : new Date(date.value).getFullYear()
        : undefined;
    });
    const formatType = computed(() => {
      if (type?.value) {
        switch (type?.value) {
          case 'EP':
          case 'EP/Single':
            return size?.value === 1 ? 'Single' : 'EP';
          case 'Single':
            return 'Single';
          default:
            return type?.value;
        }
      }

      return undefined;
    });

    return {
      formatDate,
      formatType,
    };
  },
});
</script>

<style lang="scss" scoped>
%text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@include b(cover, meta) {
  display: flex;
  flex-direction: column;

  @include e(name) {
    font-weight: bold;

    line-height: 1.6;

    @extend %text;
  }

  @include e(artists) {
    font-size: 14px;

    @extend %text;
  }

  @include e(info) {
    font-size: 14px;
  }
}

@include b(cover, info) {
  @include e(type) {
    &::after {
      content: ' · ';
    }
  }
}

@include b(artists, item) {
  &:not(:last-child)::after {
    content: '，';
  }
}

.cover-meta__name,
.artists-item__link {
  color: #000;
}
</style>
