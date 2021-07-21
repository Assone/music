<template>
  <AppHeader class="flex gap-4 xs:flex-col xs:items-center mb-4" height="">
    <Cover :src="cover" class="w-60 flex-shrink-0" />
    <div class="w-full">
      <h1 class="font-black text-2xl tracking-wide py-2 xs:text-center">
        {{ name }}
      </h1>
      <p v-if="creator" class="font-medium xs:text-center">
        <span>{{ formatType }} By </span>
        <AppLink :to="`/${type === 'playlist' ? 'user' : 'artist'}/${creator.id}`">{{ creator.name }}</AppLink>
      </p>
      <p class="mb-4 mt-2 text-gray-500" v-html="formatDescription" />
      <div class="xs:text-center">
        <AppButton
          icon="media-play"
          :class="[`transition-all transform hover:scale-105`, $style.button]"
          @click="$emit('play')"
          >Play</AppButton
        >
        <slot name="controls" />
      </div>
      <slot />
    </div>
  </AppHeader>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import AppHeader from './common/AppHeader.vue';
import AppLink from './common/AppLink.vue';
import AppButton from './common/AppButton.vue';
import Cover from './Cover.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppLink,
    AppButton,
    Cover,
  },
  props: {
    cover: String,
    name: String,
    description: String,
    type: String as PropType<'playlist' | 'album'>,
    creator: Object as PropType<{ name: string; id: number }>,
  },
  emits: ['play'],
  setup(props) {
    const { description, type } = toRefs(props);

    const formatDescription = computed(() => description?.value?.replaceAll('\n', '<br>'));
    const formatType = computed(() => `${type?.value?.charAt(0).toUpperCase()}${type?.value?.slice(1)}`);

    return {
      formatDescription,
      formatType,
    };
  },
});
</script>

<style lang="scss" module>
.button {
  background-color: hsl(var(--theme-color-raw));
}
</style>
