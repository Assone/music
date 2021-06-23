<template>
  <div class="view-artist-detail">
    <div class="flex gap-4">
      <AppAvatar class="!w-60 !h-full xs:!w-40" :src="avatar" />
      <div>
        <h1 class="font-bold text-4xl py-8 xs:text-2xl xs:py-4">{{ name }}</h1>
        <div class="meta-info__source-count text-gray-500">
          <span v-if="size?.music" class="source-count__item">
            {{ size.music }}{{ t("artist.songs") }}
          </span>
          <span v-if="size?.album" class="source-count__item">
            {{ size.album }}{{ t("artist.albums") }}
          </span>
          <span v-if="size?.mv" class="source-count__item">
            {{ size.mv }}{{ t("artist.mvs") }}
          </span>
        </div>
      </div>
    </div>
    <div>
      <ContentContainer
        v-if="album.length !== 0"
        title="专辑"
        :container-class="
          isMobile
            ? ''
            : 'grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
        "
      >
        <ContainerList
          :options="{
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
          }"
          v-bind="{ isMobile, data: album }"
          #default="{ id, cover, name, time: { publish } }"
        >
          <Cover :src="cover" :id="id" type="album">
            <CoverMeta v-bind="{ name }" :date="publish" />
          </Cover>
        </ContainerList>
      </ContentContainer>
      <ContentContainer
        v-if="epAndSingle.length !== 0"
        title="EP/Single"
        :container-class="
          isMobile
            ? ''
            : 'grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
        "
      >
        <ContainerList
          :options="{
            breakpoints: {
              320: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 5.2,
                spaceBetween: 25,
              },
              '@1.50': {
                slidesPerView: 6.2,
                spaceBetween: 30,
              },
            },
          }"
          v-bind="{ isMobile, data: epAndSingle }"
          #default="{ id, cover, name, time: { publish }, type }"
        >
          <Cover :src="cover" :id="id" type="album">
            <CoverMeta v-bind="{ name }" :date="publish" :album-type="type" />
          </Cover>
        </ContainerList>
      </ContentContainer>
      <ContentContainer
        v-if="mv.length !== 0"
        title="MV"
        container-class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <Cover
          v-for="{ id, cover, name } in mv"
          :key="id"
          :src="cover"
          :id="id"
          type="mv"
          rectangle
          use-event
          @play="handlePlayVideo"
        >
          <CoverMeta :name="name" />
        </Cover>
      </ContentContainer>
      <ContentContainer
        v-if="similar.length !== 0"
        title="相似的歌手"
        :container-class="
          isMobile
            ? ''
            : 'grid gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'
        "
      >
        <ContainerList
          :options="{
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
          }"
          v-bind="{ isMobile, data: similar }"
          #default="{ id, avatar, name }"
        >
          <div class="flex flex-col justify-center items-center">
            <AppAvatar
              :src="avatar"
              class="!w-40 !h-40 sm:!w-32 sm:!h-32 2xl:!w-24 2xl:!h-24"
            />
            <AppLink class="truncate" :to="`/artist/${id}`">{{ name }}</AppLink>
          </div>
        </ContainerList>
      </ContentContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, toRaw } from "vue";
import { useI18n } from "vue-i18n";

import AppAvatar from "@/components/common/AppAvatar.vue";
import AppLink from "@/components/common/AppLink.vue";
import ContentContainer from "@/components/ContentContainer.vue";
import Cover from "@/components/Cover.vue";
import CoverMeta from "@/components/CoverMeta.vue";
import ContainerList from "@/components/ContainerList.vue";

import useStore from "@/composables/useStore";
import useArtistDetail from "@/composables/useArtistDetail";

export default defineComponent({
  components: {
    AppAvatar,
    AppLink,
    ContentContainer,
    Cover,
    CoverMeta,
    ContainerList,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const { id } = toRefs(props);

    const {
      song,
      artist,
      albums,
      mv,
      similar,
      album,
      epAndSingle,
      name,
      avatar,
      size,
      isMobile,
      handlePlayVideo,
    } = useArtistDetail(id);

    return {
      t,

      song,
      artist,
      albums,
      mv,
      similar,
      album,
      epAndSingle,
      name,
      avatar,
      size,

      isMobile,

      handlePlayVideo,
    };
  },
});
</script>

<style lang="scss">
@include b(source, count) {
  @include e(item) {
    &::after {
      content: " · ";
    }

    &:last-child::after {
      content: "";
    }
  }
}
</style>
