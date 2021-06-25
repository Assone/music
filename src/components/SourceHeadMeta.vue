<template>
  <article class="source-meta">
    <h1 class="source-meta__title">{{ title }}</h1>
    <div class="source-meta__info">
      <div>
        <span>{{ type === 'playlist' ? 'Playlist' : 'Album' }} By </span>
        <AppLink
          :to="
            type === 'playlist'
              ? `https://music.163.com/#/user/home?id=${user.id}`
              : `/${type === 'album' ? 'artist' : 'user'}/${user.id}`
          "
          >{{ user.name }}</AppLink
        >
      </div>
      <time class="source-meta__time" v-if="time"> {{ time }}</time>
    </div>
    <div class="source-meta__content">
      <p
        class="source-meta__description"
        :class="{ 'is-more': showMore }"
        v-html="formatDescription"
        @click="switchMoreState"
      />
      <AppButton
        v-if="more"
        :class="$style.more"
        style="line-height: 1.5; height: 1.5em"
        @click="switchMoreState"
        type="text"
        >{{ showMore ? '收起' : '更多' }}
      </AppButton>
    </div>
    <slot />
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import AppButton from './common/AppButton.vue';
import AppLink from './common/AppLink.vue';

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
    AppLink,
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
    const showMore = ref(false);

    const formatDescription = computed(() => description?.value?.replaceAll('\n', '<br>'));
    const more = computed(() => (description?.value?.split('\n').length || 0) > 3);

    const switchMoreState = () => {
      showMore.value = !showMore.value;
    };

    return {
      showMore,

      formatDescription,
      more,

      switchMoreState,
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

  @include e(content) {
    position: relative;
  }

  @include e(creator) {
    @include component-link;
  }

  @include e(description) {
    max-height: 4.5em;

    text-align: start;
    line-height: 1.5;
    overflow: hidden;

    transition: 0.3s max-height;

    @include when(more) {
      max-height: 500px;
    }
  }
}
</style>

<style lang="scss" module>
.more {
  position: absolute;
  right: 0;
  bottom: 0;

  background-color: $--color-white !important;
}
</style>
