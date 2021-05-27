<template>
  <div class="avatar">
    <AppAvatar v-bind="$attrs" />
    <router-link v-if="id && name" :to="`/artist/${id}`">{{ name }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppAvatar from './common/AppAvatar.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    AppAvatar,
  },
  props: {
    id: Number,
    name: String,
  },
});
</script>

<style lang="scss" scoped>
@include b(avatar) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
