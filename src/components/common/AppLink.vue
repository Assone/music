<template>
  <a
    class="app-link"
    v-if="typeof to === 'string' && isExternalLink"
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      class="app-link"
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { RouteLocationRaw, useLink } from 'vue-router';

export default defineComponent({
  props: {
    inactiveClass: String,
    to: {
      type: [String, Object] as PropType<RouteLocationRaw | string>,
      required: true,
    },
    replace: Boolean,
    activeClass: {
      type: String,
      default: 'router-link-active',
    },
    exactActiveClass: String,
    ariaCurrentValue: String as PropType<
      'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
    >,
  },
  setup(props) {
    const { to } = toRefs(props);
    const { isActive } = useLink(props);

    const isExternalLink = computed(
      () => typeof to.value === 'string' && to.value.startsWith('http'),
    );

    return {
      isExternalLink,
      isActive,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(app, link) {
  @include component-link;
}
</style>
