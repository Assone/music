<template>
  <Suspense>
    <template #default>
      <component :is="`AppLayout${model}`">
        <template #head>
          <NavBarTitle :logo="logo" :title="title" />
          <NavBarLinks :links="nav" />
        </template>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component
              v-if="route.meta.keepAlive"
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
            />
            <keep-alive v-else>
              <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
            </keep-alive>
          </transition>
        </router-view>
      </component>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';

import { useStore } from '@/store';

import NavBarTitle from '@/components/NavBarTitle.vue';
import NavBarLinks from '@/components/NavBarLinks.vue';

export default defineComponent({
  components: {
    AppLayoutDefault: defineAsyncComponent(() => import(`./AppLayoutDefault.vue`)),
    NavBarTitle,
    NavBarLinks,
  },
  setup() {
    const store = useStore();

    const title = computed(() => store.state.config.title);
    const model = computed(() => store.state.config.layout);
    const nav = computed(() => store.state.config.nav);
    const logo = computed(() => store.state.config.logo);

    return {
      logo,
      title,
      model,
      nav,
    };
  },
});
</script>

<style lang="scss" scoped>
@include transition(fade) {
  @include direction(enter-active, leave-active) {
    transition: opacity 0.5s;
  }

  @include direction(enter, leave-to) {
    opacity: 0;
  }
}
</style>
