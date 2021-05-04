<template lang="pug">
article.cover-meta
  router-link.cover-meta__name(v-if='path', :to='path') {{ name }}
  span.cover-meta__name(v-else) {{ name }}
  .cover-meta__artists(v-if='artists')
    span.artists-item(v-for='{ id, name } in artists', :key='id')
      router-link.artists-item__link(:to='`/artist/${id}`') {{ name }}
  .cover-meta__info(v-if='date || type')
    span.cover-info__type(v-if='formatType') {{ formatType }}
    time.cover-info__time(v-if='formatDate') {{ formatDate }}
</template>

<script lang="ts">
import { isString } from '@/utils/is';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CoverMeta extends Vue {
  @Prop({ type: String }) path?: string;

  @Prop({ type: String }) name?: string;

  @Prop({ type: Array }) artists?: { id: number; name: string }[];

  @Prop({ type: [String, Number] }) date?: string | number;

  @Prop({ type: String }) type?: 'EP' | 'Single' | 'EP/Single';

  @Prop({ type: Number }) size?: number;

  get formatDate() {
    if (this.date) return isString(this.date) ? this.date : new Date(this.date).getFullYear();

    return undefined;
  }

  get formatType() {
    if (this.type) {
      switch (this.type) {
        case 'EP':
        case 'EP/Single':
          return this.size === 1 ? 'Single' : 'EP';
        case 'Single':
          return 'Single';
        default:
          return this.type;
      }
    }

    return undefined;
  }
}
</script>

<style lang="scss" scoped>
%text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@include b(cover, meta) {
  display: flex;
  flex-direction: column;

  @include e(name) {
    font-weight: bold;

    line-height: 1.6;

    @extend %text;
  }

  @include e(artists) {
    font-size: 14px;

    @extend %text;
  }

  @include e(info) {
    font-size: 14px;
  }
}

@include b(cover, info) {
  @include e(type) {
    &::after {
      content: ' · ';
    }
  }
}

@include b(artists, item) {
  &:not(:last-child)::after {
    content: '，';
  }
}

.cover-meta__name,
.artists-item__link {
  color: #000;
}
</style>
