<template>
  <AppSlider
    class="media-progress"
    v-model="value"
    :min="0"
    :max="duration"
    :format-tooltip="format"
    :height="4"
  />
</template>

<script lang="ts">
import { formatTime } from '@/utils';
import { computed, defineComponent, toRefs } from 'vue';
import AppSlider from '@/components/common/AppSlider.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppSlider,
  },
  props: {
    current: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { current } = toRefs(props);

    const value = computed({
      get: () => current.value,
      set: (v) => emit('update', v),
    });

    const format = (time: number) => formatTime(time * 1000);

    return {
      value,
      format,
    };
  },
});
</script>

<style lang="scss">
@include b(media, progress) {
  position: absolute;

  z-index: 100;
}
</style>
