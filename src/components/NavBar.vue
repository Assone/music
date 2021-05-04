<template lang="pug">
.nav-bar__container
  NavBarTitle(:logo='require("@/assets/logo.png")')
  NavLink(:links='nav')
</template>

<script lang="ts">
/* eslint-disable no-undef */
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import NavLink from './NavLinks.vue';
import NavBarTitle from './NavBarTitle.vue';

const { State } = namespace('config');

@Component({
  components: {
    NavLink,
    NavBarTitle,
  },
})
export default class NavBar extends Vue {
  @State('nav') nav!: IAppConfig['nav'];
}
</script>

<style lang="scss" scoped>
@include b(nav, bar) {
  @include e(container) {
    display: flex;
    align-items: center;

    max-width: var(--nav-bar__container-max-width);
    height: 100%;
    padding: 0 10vw;
    margin: auto;
  }
}
</style>
