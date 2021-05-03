<template lang="pug">
article.track-list__item
  .track-item__index(v-if='type === "album"') {{ index }}
  .track-item__cover(v-else) #[Cover(:src='cover')]
  .track-item__info
    .track-item__name {{ name }}
    .track-item__artists(v-if='type !== "album"')
      span.track-artists__item(v-for='{ id, name } in artists', :key='id')
        router-link(:to='`/artist/${id}`') {{ name }}
  .track-item__album(v-if='type !== "album"') #[router-link(:to='`/album/${id}`') {{ albumName }}]
  .track-item__time {{ time }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { formatTime } from '@/utils/format';
import MSong from '@/models/Song';

import Cover from './Cover.vue';

@Component({
  components: {
    Cover,
  },
})
export default class TrackListItem extends Vue {
  @Prop({ type: Object, required: true }) album!: MSong['album'];

  @Prop({ type: Array, required: true }) artists!: MSong['artists'];

  @Prop({ type: Number, required: true }) duration!: MSong['duration'];

  @Prop({ type: Number, required: true }) id!: MSong['id'];

  @Prop({ type: String, required: true }) name!: MSong['name'];

  @Prop({ type: String, required: true, validator: (type) => ['playlist', 'album'].includes(type) })
  type!: 'playlist' | 'album';

  @Prop({ type: Number }) index?: number;

  get cover() {
    return this.album.cover;
  }

  get albumName() {
    return this.album.name;
  }

  get time() {
    return formatTime(this.duration);
  }
}
</script>

<style lang="scss" scoped>
@include b(track, list) {
  @include e(item) {
    display: flex;
    align-items: center;

    transition: 0.1s;

    &:hover {
      background: #f00;
    }
  }
}

@include b(track, item) {
  &__info,
  &__album {
    flex: 1;
  }

  @include e(cover) {
    width: 5vw;
    margin-right: 10px;
  }

  @include e(index) {
    flex-basis: 2rem;

    text-align: center;
  }
}

@include b(track, artists) {
  @include e(item) {
    &:not(:last-child)::after {
      content: ',';
    }
  }
}
</style>
