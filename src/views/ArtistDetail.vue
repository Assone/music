<template>
  <div class="view-artist-detail">
    <ArtistMeta :avatar="avatar" :name="name" v-bind="size" />
    <AppSection v-if="album.length !== 0">
      <SectionHead title="专辑" />
      <AppBanner
        :options="bannerAlbum"
        :data="album"
        #default="{ id, cover, name, time: { publish } }"
      >
        <Cover :src="cover" :id="id" type="album">
          <CoverMeta :path="`/album/${id}`" :name="name" :date="publish" />
        </Cover>
      </AppBanner>
    </AppSection>
    <AppSection v-if="epAndSingle.length !== 0">
      <SectionHead title="EP/Single" />
      <AppBanner
        :options="bannerEP"
        :data="epAndSingle"
        #default="{ id, cover, name, time: { publish }, type }"
      >
        <Cover :src="cover" :id="id" type="album">
          <CoverMeta :path="`/album/${id}`" :name="name" :date="publish" :type="type" />
        </Cover>
      </AppBanner>
    </AppSection>
    <AppSection v-if="mv.length !== 0">
      <SectionHead title="Video" />
      <div class="container__mv">
        <Cover
          v-for="{ id, cover, name } in mv"
          :key="id"
          :src="cover"
          :id="id"
          type="mv"
          rectangle
        >
          <CoverMeta :path="`/mv/${id}`" :name="name" />
        </Cover>
      </div>
    </AppSection>
    <AppSection v-if="similar.length !== 0">
      <SectionHead title="类似艺人" />
      <AppBanner :options="bannerArtists" :data="similar" #default="{ id, avatar, name }">
        <div class="container__avatar">
          <Avatar :src="avatar" :size="128" />
          <router-link :to="`/artist/${id}`"> {{ name }}</router-link>
        </div>
      </AppBanner>
    </AppSection>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { done } from 'nprogress';

import { useArtistDetailData } from '@/composition/artist';

import AppBanner, { Options } from '@/components/common/AppBanner.vue';
import AppSection from '@/components/common/AppSection.vue';
import Avatar from '@/components/common/AppAvatar.vue';
import ArtistMeta from '@/components/ArtistMeta.vue';
import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';
import SectionHead from '@/components/SectionHead.vue';

export default defineComponent({
  components: {
    AppBanner,
    AppSection,
    SectionHead,
    ArtistMeta,
    Avatar,
    Cover,
    CoverMeta,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    const { name, avatar, size, mv, similar, epAndSingle, album, fetch } = useArtistDetailData();

    const bannerAlbum = reactive<Options>({
      slidesPerView: 5,
      spaceBetween: 30,
      breakpoints: {
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
    });
    const bannerEP = reactive<Options>({
      slidesPerColumn: 2,
      spaceBetween: 20,
      slidesPerColumnFill: 'row',
      breakpoints: {
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
    });
    const bannerArtists = reactive<Options>({
      slidesPerView: 6,
      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        460: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        840: {
          slidesPerView: 5.5,
        },
        980: {
          slidesPerView: 6,
        },
        1120: {
          slidesPerView: 7,
        },
        1260: {
          slidesPerView: 8,
        },
      },
    });

    fetch(id.value).then(() => done());

    onBeforeRouteUpdate((to, _from, next) => {
      fetch(Number(to.params.id))
        .then(next)
        .then(() => done());
    });

    return {
      bannerAlbum,
      bannerEP,
      bannerArtists,

      name,
      avatar,
      size,

      mv,
      similar,
      epAndSingle,
      album,
    };
  },
});
</script>

<style lang="scss" scoped>
@include b(container) {
  @include e(mv) {
    display: grid;
    gap: 20px;

    width: 100%;

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

  @include e(avatar) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
