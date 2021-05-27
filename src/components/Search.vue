<template>
  <article class="search">
    <input type="search" v-model="keyword" @keydown.enter="toSearch" />
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const keyword = ref('');

    const toSearch = () => {
      router.push(`/search/${keyword.value}`);
    };

    return {
      keyword,

      toSearch,
    };
  },
});
</script>
