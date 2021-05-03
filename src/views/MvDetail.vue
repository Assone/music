<template lang="pug">
.view-mv-detail
  video(:src='source', controls, width='100%', :poster='cover')
  .mv-info
    h1 #[router-link(v-if='artist', :to='`/artist/${artist.id}`') {{ artist.name }}] - {{ name }}
    time {{ time }}
  .mv-simi
    Cover(
      v-for='{ id, name, cover, artists } in simi',
      :key='id',
      :id='id',
      :src='cover',
      type='mv',
      square
    )
      CoverMeta(:name='name', :artists='artists', :path='`/mv/${id}`')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';

import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

import MMV from '@/models/MV';
import MSimilarMV from '@/models/SimilarMV';

@Component({
  components: {
    Cover,
    CoverMeta,
  },
})
export default class MvDetail extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  source: string | null = null;

  model: MMV | null = null;

  simi: MSimilarMV[] | null = null;

  get name() {
    return this.model?.name;
  }

  get cover() {
    return this.model?.cover;
  }

  get artist() {
    return this.model?.artist;
  }

  get time() {
    return this.model?.time;
  }

  async loadingData(id: number) {
    this.model = await this.$api.getMVDetail(id);
    const { url } = await this.$api.getMVUrl(id);

    this.source = url;
    this.$api.getSimilarMV(id).then((simi) => {
      this.simi = simi;
    });
  }

  created() {
    this.loadingData(this.id);
  }

  beforeRouteUpdate(to: Route, _from: Route, next: NavigationGuardNext) {
    const id = Number(to.params.id);

    this.loadingData(id);
    next();
  }
}
</script>

<style lang="scss" scoped>
@include b(mv, simi) {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
</style>
