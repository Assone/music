<template>
  <div
    class="cover relative"
    :class="$attrs.class"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="cover__inner hover:shadow-lg relative">
      <MaskShadow
        :src="`${$attrs.src}`"
        class="hidden"
        :class="[hover ? $style['mask-shadow'] : '']"
      />
      <AppImage
        class="cover__image rounded-lg"
        :class="[{ 'is-rectangle': rectangle }]"
        lazy
        fit="cover"
        v-bind="{ ...$attrs, class: {} }"
      />
      <Mask
        :class="[canTo ? 'cursor-pointer' : '']"
        @click-inner="$emit('play', { type, id })"
        @click="canTo ? toNextView() : ''"
      />
      <!-- @click="canTo ? toNextView() : ''" -->

      <slot name="inner" />
    </div>
    <slot class="z-10" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

import AppImage from "./common/AppImage.vue";
import Mask from "./Mask.vue";
import MaskShadow from "./MaskShadow.vue";

import { isUndefined } from "@/utils";

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppImage,
    Mask,
    MaskShadow,
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
    const hover = ref(false);

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
    const handleMouseEnter = () => {
      hover.value = true;
    };
    const handleMouseLeave = () => {
      hover.value = false;
    };

    provide("id", id);
    provide("type", type);

    return {
      canTo,

      hover,
      handleMouseEnter,
      handleMouseLeave,

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

<style module>
.mask-shadow {
  display: block;
}
</style>
