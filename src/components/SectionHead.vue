<template>
  <article class="section-head">
    <div class="section-head__meta">
      <AppAvatar v-if="avatar" :src="avatar" />
      <div class="section-head__info">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <div class="section-head__link" v-if="next">
        <router-link :to="next.link">
          {{ next.text }}
        </router-link>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import AppAvatar from './common/AppAvatar.vue';

export default defineComponent({
  components: {
    AppAvatar,
  },
  props: {
    avatar: String,
    title: String,
    description: String,
    next: {
      type: Object as PropType<{ link: RouteLocationRaw; text: string }>,
    },
  },
});
</script>

<style lang="scss" scoped>
@include b(section, head) {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include e(meta) {
    display: flex;

    flex-grow: 1;
    align-items: center;
  }

  @include e(info) {
    flex-grow: 1;
  }
}
</style>
