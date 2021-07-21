declare module 'eruda' {
  export const init: () => void;
}

declare module 'swiper/vue' {
  import { DefineComponent } from 'vue';

  export const Swiper: DefineComponent<unknown, unknown, unknown>;
  export const SwiperSlide: DefineComponent<unknown, unknown, unknown>;
}
