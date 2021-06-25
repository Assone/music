<template>
  <div class="cover" :class="$attrs.class">
    <div class="cover__container" @click="toDetail">
      <AppImage
        :class="['cover__image', { 'can-click': canClick, 'is-rectangle': rectangle }]"
        lazy
        fit="cover"
        v-bind="$attrs"
      />
      <slot name="container" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppImage from './common/AppImage.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppImage,
  },
  props: {
    id: Number,
    type: {
      type: String,
      validator: (type: string) => ['playlist', 'album', 'mv'].includes(type),
    },
    rectangle: Boolean,
  },
  setup(props) {
    const router = useRouter();

    const canClick = props.type !== undefined && props.id !== undefined;

    const toDetail = () => {
      if (canClick) router.push(`/${props.type}/${props.id}`);
    };

    return {
      canClick,
      toDetail,
    };
  },
});
</script>

<style lang="scss">
%size {
  width: 100%;
  height: 100%;
}

@include b(cover) {
  @extend %size;

  @include e(container) {
    position: relative;
  }

  @include e(image) {
    border-radius: 5px;

    @include when(rectangle) {
      aspect-ratio: 16/9;
    }

    @include can(click) {
      cursor: pointer;
    }
  }
}
</style>
