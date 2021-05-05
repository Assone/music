<template lang="pug">
article.track-list__item(:class='{ "is-album": type === "album" }', v-on='$listeners')
  .track-item__index(v-if='type === "album"') {{ index }}
  .track-item__cover(v-else) #[Cover(:src='cover')]
  .track-item__info
    .track-item__name {{ name }}
    .track-item__artists(v-if='type !== "album"')
      span.track-item__artists-item(v-for='{ id, name } in artists', :key='id')
        router-link(:to='`/artist/${id}`') {{ name }}
  .track-item__album(v-if='type !== "album"') #[router-link(:to='`/album/${albumId}`') {{ albumName }}]
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

  get albumId() {
    return this.album.id;
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
    user-select: none;

    padding: 5px 10px;

    transition: 0.1s;

    &:hover {
      background: #f00 !important;
    }

    @include when(album) {
      line-height: 1.6;
    }
  }
}

@include b(track, item) {
  &__info,
  &__album {
    flex: 1;
  }

  @include e(cover) {
    width: 3vw;
    margin-right: 10px;

    @include media(xs) {
      width: 15vw;
    }
  }

  @include e(index) {
    flex-basis: 1rem;

    margin-right: 1rem;

    text-align: center;
  }

  @include e(artists-item) {
    &:not(:last-child)::after {
      content: ', ';
    }
  }
}
</style>
