<template lang="pug">
article.section-head
  .section-head__meta
    AppAvatar(v-if='avatar', :src='avatar')
    .section-head__info
      h2 {{ title }}
      p {{ description }}
  .section-head__link(v-if='next') #[router-link(:to='next.link') {{ next.text }}]
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppAvatar from './common/AppAvatar.vue';

@Component({
  components: {
    AppAvatar,
  },
})
export default class SectionHead extends Vue {
  @Prop({ type: String, required: true }) title?: string;

  @Prop({ type: String }) description?: string;

  @Prop({ type: String }) avatar?: string;

  @Prop({ type: Object }) next?: { link: string; text: string };
}
</script>

<style lang="scss" scoped>
@include b(section, head) {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include e(meta) {
    display: flex;
    align-items: center;
  }
}
</style>
