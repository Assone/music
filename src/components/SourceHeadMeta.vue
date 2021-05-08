<template lang="pug">
article.source-meta
  h1.source-meta__title {{ title }}
  .source-meta__info
    router-link.source-meta__creator(:to='`/${type === "album" ? "artist" : "user"}/${user.id}`') {{ user.name }}
    time.source-meta__time(v-if='time') {{ time }}
  p.source-meta__description(v-html='formatDescription')
  slot
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import AppButton from './common/AppButton.vue';

export interface Props {
  title: string;
  description?: string;
  user: {
    id: number;
    name: string;
  };
  type?: 'playlist' | 'album';
  time?: string;
}

export default defineComponent({
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Object as PropType<{ id: number; name: string }>,
      required: true,
    },
    description: String,
    type: String as PropType<'playlist' | 'album'>,
    time: String,
  },
  setup(props) {
    const { description } = toRefs(props);

    const formatDescription = computed(() => description?.value?.replaceAll('\n', '<br>'));

    return {
      formatDescription,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(source, meta) {
  @include e(time) {
    &::before {
      content: ' · ';
    }
  }

  @include e(description) {
    text-align: start;
  }
}
</style>
