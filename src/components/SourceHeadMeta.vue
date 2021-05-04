<template lang="pug">
article.source-meta
  h1.source-meta__title {{ title }}
  .source-meta__info
    router-link.source-meta__creator(:to='`/${type === "album" ? "artist" : "user"}/${user.id}`') {{ user.name }}
    time.source-meta__time(v-if='time') {{ time }}
  p.source-meta__description(v-html='formatDescription')
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SourceHeadMeta extends Vue {
  @Prop({ type: String, required: true }) title!: string;

  @Prop({ type: String }) description?: string;

  @Prop({ type: Object, required: true }) user!: { id: number; name: string };

  @Prop({ type: String }) type?: 'playlist' | 'album';

  @Prop({ type: String }) time?: string;

  get formatDescription() {
    return this.description?.replaceAll('\n', '<br>');
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  @include b(source, meta) {
    padding: 10px;

    @include e(info) {
      display: flex;
      justify-content: center;
    }

    @include e(creator) {
      &::after {
        content: ' · ';
      }
    }

    @include e(description) {
      text-align: start;
    }
  }
}
</style>
