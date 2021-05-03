<template lang="pug">
.view-home
  AppMenu(ref='menu')
    .item 添加到歌单
    .item 添加到歌单1
    .item 添加到歌单2
  AppSection
    template(#head)
      SectionHead(title='Recommend Playlist', :next='{ link: "/playlist", text: "See All" }')
    AppBanner(:options='options')
      AppBannerItem(v-for='{ id, name, cover } in playlist', :key='id')
        Cover(@menu='openMenu', :id='id', :src='cover', type='playlist')
          CoverMeta(:path='`/playlist/${id}`', :name='name')
  AppSection(container-class-name='content')
    template(#head)
      SectionHead(title='Recommend Album', :next='{ link: "/album", text: "See All" }')
    Cover(
      v-for='{ id, name, cover, artists } in album',
      :key='id',
      @menu='openMenu',
      :id='id',
      :src='cover',
      type='album'
    )
      CoverMeta(:path='`/album/${id}`', :name='name', :artists='artists')
  AppSection(container-class-name='section-container__mv')
    template(#head)
      SectionHead(title='推荐MV')
    Cover(v-for='{ id, cover, name } in mvs', :key='id', :src='cover', :id='id', type='mv', square)
      CoverMeta(:path='`/mv/${id}`', :name='name')
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { SwiperOptions } from 'swiper';

import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import AppMenu from '@/components/common/AppMenu.vue';
import AppSection from '@/components/common/AppSection.vue';
import SectionHead from '@/components/SectionHead.vue';
import AppBanner from '@/components/common/AppBanner.vue';
import AppBannerItem from '@/components/common/AppBannerItem.vue';

import MRecPlaylist from '@/models/RecPlaylist';
import MAlbum from '@/models/Album';
import MRecMV from '@/models/RecMV';

@Component({
  components: {
    Cover,
    CoverMeta,
    AppMenu,
    AppSection,
    SectionHead,
    AppBanner,
    AppBannerItem,
  },
})
export default class Home extends Vue {
  @Ref('menu') readonly menu!: AppMenu;

  playlist: MRecPlaylist[] | null = null;

  mvs: MRecMV[] = [];

  album: MAlbum[] | null = null;

  options: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      '@0.75': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 4,
        spaceBetween: 25,
      },
      '@1.50': {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  };

  async created() {
    this.playlist = await this.$api.getRecPlaylist(10);
    this.mvs = await this.$api.getRecMV();
    this.album = await this.$api.getAlbumNewest();
  }

  openMenu(evt: MouseEvent) {
    this.menu.handleOpen(evt);
  }
}
</script>

<style lang="scss">
.content {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 20px;
}

@include b(section, container) {
  @include e(mv) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
</style>
