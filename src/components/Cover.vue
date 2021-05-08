<template lang="pug">
.cover
  .cover__container(@click='toDetail' )
    AppImage.cover__image(:class='{ "can-click": canClick }', lazy, fit="cover" v-bind='$attrs',)
    slot(name='container')
  slot
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import AppImage from './common/AppImage.vue';

export default defineComponent({
  components: {
    AppImage,
  },
  props: {
    id: Number,
    type: {
      type: String,
      validator: (type: string) => ['playlist', 'album', 'mv'].includes(type),
    },
  },
  setup(props) {
    const { id, type } = toRefs(props);
    const router = useRouter();

    const canClick = computed(() => type?.value !== undefined && id?.value !== undefined);

    const toDetail = () => (canClick.value ? router.push(`/${type?.value}/${id?.value}`) : '');

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

    @include can(click) {
      cursor: pointer;
    }
  }
}
</style>
