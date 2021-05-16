<template>
  <div class="view-mv-detail">
    <video :src="src" controls :poster="cover" :style="{ width: '100%' }"></video>
    <div class="mv-info">
      <h1>
        <router-link v-if="artist" :to="`/artist/${artist.id}`">{{ artist.name }} </router-link>
        - {{ name }}
      </h1>
      <time>{{ time }}</time>
    </div>
    <div class="mv-simi">
      <Cover
        v-for="{ id, name, cover, artists } in simi"
        :key="id"
        :id="id"
        :src="cover"
        type="mv"
        square
      >
        <CoverMeta :name="name" :artists="artists" :path="`/mv/${id}`" />
      </Cover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { done } from 'nprogress';

import Cover from '@/components/Cover.vue';
import CoverMeta from '@/components/CoverMeta.vue';

import { useMvData } from '@/hooks/mv';

export default defineComponent({
  components: {
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
    const { simi, src, name, cover, artist, time, fetch } = useMvData();

    fetch(id.value).then(() => done());

    onBeforeRouteUpdate((to, _from, next) => {
      fetch(Number(to.params.id))
        .then(next)
        .then(() => done());
    });

    return {
      src,
      simi,

      name,
      cover,
      artist,
      time,
    };
  },
});
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
