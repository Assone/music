<template lang="pug">
.view-artist-detail
  ArtistMeta(:avatar='avatar', :name='name', v-bind='size')
  AppSection(v-if='albums.length !== 0', title='专辑')
    AppBanner(:options='{ slidesPerView: 5, spaceBetween: 30 }')
      AppBannerItem(v-for='{ id, cover, name, time: { publish } } in albums', :key='id')
        Cover(:src='cover', :id='id', type='album')
          CoverMeta(:path='`/album/${id}`', :name='name', :date='publish')
  AppSection(v-if='epAndSingle.length !== 0', title='EP/Single')
    AppBanner(
      :options='{ slidesPerView: 6, slidesPerColumn: 2, spaceBetween: 20, slidesPerColumnFill: "row" }'
    )
      AppBannerItem(v-for='{ id, cover, name, time: { publish }, type } in epAndSingle', :key='id')
        Cover(:src='cover', :id='id', type='album')
          CoverMeta(:path='`/album/${id}`', :name='name', :date='publish', :type='type')
  AppSection(v-if='mvs.length !== 0', title='Video', container-class-name='section-list__mv')
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
        Avatar(:src='avatar', :name='name', :id='id')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
import ArtistMeta from '@/components/ArtistMeta.vue';
import AppSection from '@/components/common/AppSection.vue';
import Avatar from '@/components/Avatar.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import AppBanner from '@/components/common/AppBanner.vue';
import AppBannerItem from '@/components/common/AppBannerItem.vue';

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
  },
})
export default class ArtistDetail extends Vue {
  @Prop({ type: Number, required: true }) id!: number;

  artist: MArtist | null = null;

  similarArtist: MArtist[] = [];

  songs: MSong[] = [];

  albumList: MAlbum[] = [];

  mvs: MArtistMV[] = [];

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
    });

    this.artist = artist;
    this.songs = songs;
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

<style lang="scss">
@include b(section, list) {
  @include e(mv) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
</style>
