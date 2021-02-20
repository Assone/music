<template lang="pug">
header.nav-bar
  ToggleMenuButton(@toggle='$emit("toggle")')
  NavBarTitle(:title='title', :logo='require("@/assets/logo.png")')
  NavLinks(:list='nav')
  slot(name='search')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import ToggleMenuButton from '@/components/ToggleMenuButton.vue';
import NavBarTitle from '@/components/NavBarTitle.vue';
import NavLinks from '@/components/NavLinks.vue';

const { State } = namespace('config');

@Component({
  components: {
    ToggleMenuButton,
    NavBarTitle,
    NavLinks,
  },
})
export default class NavBar extends Vue {
  @State('title') title?: string;

  @State('nav') nav!: IappNavItemConfig[];
}
</script>

<style lang="scss" scoped>
@include b(nav, bar) {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: var(--navBar-height);
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  border-bottom: 1px solid rgba(60, 60, 67, 0.12);

  background-color: #fff;
}
</style>
