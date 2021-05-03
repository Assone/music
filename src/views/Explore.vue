<template lang="pug">
.view-explore
  ExploreTab(:tabs='tabs')
  AppSection(title='最新音乐', container-class-name='container__songs')
    Cover(v-for='({ id, name, cover, artists }, index) in songs', :key='id', :src='cover')
      span {{ index + 1 }}
      CoverMeta(:name='name', :artists='artists')

  AppSection(container-class-name='container__mv-official')
    template(#head)
      SectionHead(title='独家推荐')
    Cover(
      v-for='{ id, cover, name } in mvsOfficial',
      :key='id',
      :src='cover',
      :id='id',
      type='mv',
      square
    )
      CoverMeta(:path='`/mv/${id}`', :name='name')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MMetaSource from '@/models/MetaSource';

import ExploreTab from '@/components/ExploreTab.vue';
import AppSection from '@/components/common/AppSection.vue';
import SectionHead from '@/components/SectionHead.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

import MMV from '@/models/MV';

@Component({
  components: {
    ExploreTab,
    AppSection,
    SectionHead,
    Cover,
    CoverMeta,
  },
})
export default class Explore extends Vue {
  songs: (MMetaSource & { artists: { id: number; name: string }[] })[] = [];

  mvsOfficial: MMV[] = [];

  tabs = [
    {
      text: '排行榜',
      url: '/top',
    },
    {
      text: '电台',
      url: '/radio',
    },
    {
      text: '所有歌手',
      url: '/artists',
    },
  ];

  async created() {
    this.songs = await this.$api.getRecSong();

    this.mvsOfficial = await this.$api.getMVOfficial(5);
  }
}
</script>

<style lang="scss">
@include b(container) {
  @include e(songs) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

  @include e(mv-official) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
}
</style>
