<template>
  <div class="view-user-detail">
    <div v-if="info" class="flex gap-8">
      <AppAvatar class="!w-40 !h-40 flex-shrink-0" :src="info.avatar" />
      <div>
        <h1 class="text-2xl">{{ info.name }}</h1>
        <p>{{ info.signature }}</p>
      </div>
    </div>
    <div>
      <ContentContainer
        title="创建的歌单"
        container-class="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <Cover
          v-for="{ id, cover, name } in playlist"
          :key="id"
          :id="id"
          :src="cover"
          type="playlist"
        >
          <CoverMeta v-bind="{ name }" />
        </Cover>
      </ContentContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

import { getUserDetail, getUserPlaylist } from "@/apis";

import AppAvatar from "@/components/common/AppAvatar.vue";
import ContentContainer from "@/components/ContentContainer.vue";
import Cover from "@/components/Cover.vue";
import CoverMeta from "@/components/CoverMeta.vue";

export default defineComponent({
  components: {
    AppAvatar,
    ContentContainer,
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
    const info = ref<Model.Profile | null>(null);
    const data = reactive<{ playlist: Model.Playlist[] }>({
      playlist: [],
    });

    const fetch = (id: number) => {
      getUserDetail(id).then((res) => {
        info.value = res;
      });
      getUserPlaylist(id).then(({ playlist }) => {
        data.playlist = playlist;
      });
    };

    fetch(id.value);

    onBeforeRouteUpdate((to) => {
      fetch(Number(to.params.id));
    });

    return {
      info,
      ...toRefs(data),
    };
  },
});
</script>
