<template lang="pug">
article.source-meta
  h1.source-meta__title {{ title }}
  .source-meta__creator #[router-link(:to='`/${type === "album" ? "artist" : "user"}/${user.id}`') {{ user.name }}]
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
