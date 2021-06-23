<template>
  <div class="cover" :class="$attrs.class">
    <div class="cover__inner hover:shadow-lg relative">
      <AppImage
        class="cover__image rounded-lg"
        :class="[{ 'is-rectangle': rectangle }]"
        lazy
        fit="cover"
        v-bind="{ ...$attrs, class: {} }"
      />
      <Mask
        :class="[canTo ? 'cursor-pointer' : '']"
        @click="$emit('play', { type, id })"
      />
      <!-- @click="canTo ? toNextView() : ''" -->

      <slot name="inner" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide, toRefs } from "vue";

import AppImage from "./common/AppImage.vue";
import Mask from "./Mask.vue";

import { isUndefined } from "@/utils";
import { useRouter } from "vue-router";

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppImage,
    Mask,
  },
  emits: ["play"],
  props: {
    id: Number,
    type: {
      type: String as PropType<"playlist" | "album" | "mv">,
    },
    rectangle: Boolean,
    useEvent: Boolean,
  },
  setup(props, { emit }) {
    const { id, type, useEvent } = toRefs(props);
    const { push } = useRouter();

    const canTo = computed(
      () => !isUndefined(id?.value) && !isUndefined(type?.value)
    );
    const toNextView = () => {
      if (useEvent.value) {
        emit("play", { type: type?.value, id: id?.value });
      } else {
        push(`/${type?.value}/${id?.value}`);
      }
    };

    provide("id", id);
    provide("type", type);

    return {
      canTo,

      toNextView,
    };
  },
});
</script>

<style lang="scss">
@include b(cover) {
  @include e(image) {
    @include when(rectangle) {
      aspect-ratio: 16/9;
    }
  }
}
</style>
