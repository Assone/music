<template lang="pug">
Slider(v-model='value', :process='true'  :min='0' :max='duration' :interval="0.01" tooltip='hover' :tooltip-formatter='format' :lazy="true")
</template>

<script lang="ts">
import { formatTime } from '@/utils';
import { computed, defineComponent, toRefs } from 'vue';
import Slider from 'vue-slider-component';

export default defineComponent({
  components: {
    Slider,
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
  setup(props, ctx) {
    const { current } = toRefs(props);

    const format = (time: number) => formatTime(time * 1000);

    const value = computed({
      get: () => current.value,
      set: (value) => ctx.emit('change', value),
    });

    return {
      format,
      value,
    };
  },
});
</script>

<style lang="scss">
@import 'vue-slider-component/lib/theme/default.scss';
</style>
