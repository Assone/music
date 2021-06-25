<template>
  <div class="avatar">
    <AppAvatar v-bind="$attrs" />
    <AppLink class="avatar__name" v-if="path" :to="path">{{ name }}</AppLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppAvatar from './common/AppAvatar.vue';
import AppLink from './common/AppLink.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppAvatar,
    AppLink,
  },
  props: {
    name: String,
    path: String,
  },
});
</script>

<style lang="scss" scoped>
@include b(avatar) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include e(name) {
    margin-top: 1rem;

    @include component-link;
  }
}
</style>
