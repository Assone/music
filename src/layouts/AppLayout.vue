<template>
  <component :is="`AppLayout${model}`">
    <template #head>
      <NavBarTitle :logo="logo" :title="title" />
      <NavBarLinks :links="nav" />
    </template>
    <suspense>
      <template #default>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <!-- <keep-alive> -->
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
              class="view-container"
            />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </template>
    </suspense>
  </component>
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

<style lang="scss">
@include b(view, container) {
  margin-bottom: $--nav-bar-height + 30px;
}

@include transition(fade) {
  @include direction(enter-active, leave-active) {
    transition: opacity 0.5s;
  }

  @include direction(enter, leave-to) {
    opacity: 0;
  }
}
</style>
