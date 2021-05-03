<template lang="pug">
Swiper(:options='config')
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SwiperCore, { SwiperOptions, Mousewheel, Virtual } from 'swiper';
import { Swiper } from 'vue-awesome-swiper';

import 'swiper/swiper.scss';

SwiperCore.use([Mousewheel, Virtual]);

@Component({
  components: {
    Swiper,
  },
})
export default class AppBanner extends Vue {
  @Prop({ type: Object }) options?: SwiperOptions;

  get config() {
    const defaultConfig: SwiperOptions = {
      mousewheel: true,
    };

    return {
      ...defaultConfig,
      ...this.options,
    };
  }
}
</script>
