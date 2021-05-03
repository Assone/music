<template lang="pug">
components(:is='component')
  keep-alive
    router-view(v-if='$route.meta.keepAlive')
  router-view(v-if='!$route.meta.keepAlive')
  template(#head)
    NavBar
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import NavBar from '@/components/NavBar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class AppLayout extends Vue {
  // eslint-disable-next-line no-undef
  @State('layout', { namespace: 'config' }) layout!: IAppConfig['layout'];

  get component() {
    return () => import(`./AppLayout${this.layout}.vue`);
  }
}
</script>
