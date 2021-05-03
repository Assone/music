<template lang="pug">
SwiperSlide #[slot]
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SwiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    SwiperSlide,
  },
})
export default class AppBannerItem extends Vue {}
</script>
