<template lang="pug">
.view-home
  AppMenu(ref='menu')
    .item 添加到歌单
    .item 添加到歌单1
    .item 添加到歌单2
  AppSection
    SectionHead(title='Recommend Playlist', :next='{ link: "/playlist", text: "See All" }')
    AppBanner(:options='options')
      AppBannerItem(v-for='{ id, name, cover } in playlist', :key='id')
        Cover(@menu='openMenu', :id='id', :src='cover', type='playlist')
          CoverMeta(:path='`/playlist/${id}`', :name='name')
  AppSection
    SectionHead(title='Recommend Album', :next='{ link: "/album", text: "See All" }')
    .container__album
      Cover(
        v-for='{ id, name, cover, artists } in album',
        :key='id',
        @menu='openMenu',
        :id='id',
        :src='cover',
        type='album'
      )
        CoverMeta(:path='`/album/${id}`', :name='name', :artists='artists')
  AppSection
    SectionHead(title='推荐MV')
    .container__mv
      Cover(
        v-for='{ id, cover, name } in mvs',
        :key='id',
        :src='cover',
        :id='id',
        type='mv',
        square
      )
        CoverMeta(:path='`/mv/${id}`', :name='name')
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { SwiperOptions } from 'swiper';
import { done } from 'nprogress';

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
      320: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3.2,
        spaceBetween: 25,
      },
      640: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  };

  async created() {
    this.playlist = await this.$api.getRecPlaylist(10);
    this.mvs = await this.$api.getRecMV();
    this.album = await this.$api.getAlbumNewest();

    done();
  }

  openMenu(evt: MouseEvent) {
    this.menu.handleOpen(evt);
  }
}
</script>

<style lang="scss" scoped>
@include b(container) {
  @include e(album) {
    display: grid;
    gap: 50px 20px;

    @include media(xs) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @include media(sm) {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }

    @include media(xl) {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }

  @include e(mv) {
    display: grid;
    gap: 30px 20px;
    grid-template-rows: auto;

    @include media(xs) {
      grid-template-columns: repeat(1, minmax(100px, 1fr));
    }

    @include media(sm) {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @include media(md) {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }
  }
}
</style>
