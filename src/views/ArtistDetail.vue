<template lang="pug">
.view-artist-detail
  ArtistMeta(:avatar='avatar', :name='name', v-bind='size')
  AppSection(v-if='albums.length !== 0')
    SectionHead(title='专辑')
    AppBanner(:options='{ slidesPerView: 5, spaceBetween: 30, breakpoints: bannerOptions.album }')
      AppBannerItem(v-for='{ id, cover, name, time: { publish } } in albums', :key='id')
        Cover(:src='cover', :id='id', type='album')
          CoverMeta(:path='`/album/${id}`', :name='name', :date='publish')
  AppSection(v-if='epAndSingle.length !== 0')
    SectionHead(title='EP/Single')
    AppBanner(
      :options='{ slidesPerColumn: 2, spaceBetween: 20, slidesPerColumnFill: "row", breakpoints: bannerOptions.ep }'
    )
      AppBannerItem(v-for='{ id, cover, name, time: { publish }, type } in epAndSingle', :key='id')
        Cover(:src='cover', :id='id', type='album')
          CoverMeta(:path='`/album/${id}`', :name='name', :date='publish', :type='type')
  AppSection(v-if='mvs.length !== 0')
    SectionHead(title='Video')
    .container__mv
      Cover(
        v-for='{ id, cover, name, time } in mvs',
        :key='id',
        :src='cover',
        :id='id',
        type='mv',
        square
      ) 
        CoverMeta(:path='`/album/${id}`', :name='name', :date='time')
  AppSection(v-if='similarArtist.length !== 0', title='类似艺人')
    AppBanner(:options='{ slidesPerView: 6 }')
      AppBannerItem(v-for='{ id, avatar, name } in similarArtist', :key='id')
        Avatar(:src='avatar')
        router-link(:to='`/artist/${id}`') {{ name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
import { start, done } from 'nprogress';

import AppSection from '@/components/common/AppSection.vue';
import AppBanner from '@/components/common/AppBanner.vue';
import AppBannerItem from '@/components/common/AppBannerItem.vue';
import Avatar from '@/components/common/AppAvatar.vue';
import ArtistMeta from '@/components/ArtistMeta.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import SectionHead from '@/components/SectionHead.vue';

import MArtist from '@/models/Artist';
import MSong from '@/models/Song';
import MAlbum from '@/models/Album';
import MArtistMV from '@/models/ArtistMV';

@Component({
  components: {
    AppSection,
    ArtistMeta,
    Avatar,
    Cover,
    CoverMeta,
    AppBanner,
    AppBannerItem,
    SectionHead,
  },
})
export default class ArtistDetail extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  artist: MArtist | null = null;

  similarArtist: MArtist[] = [];

  songs: MSong[] = [];

  albumList: MAlbum[] = [];

  mvs: MArtistMV[] = [];

  bannerOptions = {
    album: {
      320: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3.2,
        spaceBetween: 25,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    ep: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 5,
        spaceBetween: 25,
      },
      '@1.50': {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
  };

  get name() {
    return this.artist?.name || '';
  }

  get avatar() {
    return this.artist?.avatar || '';
  }

  get epAndSingle() {
    return this.albumList.filter((album) => ['EP/Single', 'EP', 'Single'].includes(album.type));
  }

  get albums() {
    return this.albumList.filter((album) => album.type === '专辑');
  }

  get size() {
    return this.artist?.size;
  }

  async loadingData(id: number) {
    const { artist, songs } = await this.$api.getArtistInfo(id);
    this.$api.getArtistAlbum(id, 200).then(({ albums }) => {
      this.$api.getArtistMV(id).then(({ mv }) => {
        this.mvs = mv;
      });
      this.$api.getSimilarArtist(id).then((res) => {
        this.similarArtist = res;
      });

      this.albumList = albums;
      done();
    });

    this.artist = artist;
    this.songs = songs;
  }

  created() {
    this.loadingData(this.id);
  }

  beforeRouteUpdate(to: Route, _from: Route, next: NavigationGuardNext) {
    const id = Number(to.params.id);

    start();
    this.loadingData(id).then(next);
  }
}
</script>

<style lang="scss">
@include b(container) {
  @include e(mv) {
    display: grid;
    gap: 50px 20px;

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
}
</style>
