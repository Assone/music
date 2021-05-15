<template>
  <Swiper v-bind="options">
    <SwiperSlide v-for="(item, index) in data" :key="index">
      <slot v-bind="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="tsx">
import { defineComponent, PropType, toRefs } from 'vue';
import SwiperCore, { SwiperOptions, Mousewheel, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.scss';

SwiperCore.use([Mousewheel, Virtual]);

export type Options = SwiperOptions;

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    options: Object as PropType<SwiperOptions>,
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
});
</script>
