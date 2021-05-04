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
import { done } from 'nprogress';

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

    done();
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
  gap: 50px 10px;

  @include media(xs) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
  }

  @include media(sm) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }

  @include media(md) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }

  @include media(lg) {
    grid-template-columns: repeat(4, minmax(100px, 1fr));
  }

  @include media(xl) {
    grid-template-columns: repeat(5, minmax(100px, 1fr));
  }
}
</style>
