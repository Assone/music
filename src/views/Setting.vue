<template>
  <div class="view-setting">
    <AppSection>
      <SectionHead title="外观设置" />
    </AppSection>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppSection from '@/components/common/AppSection.vue';
import SectionHead from '@/components/SectionHead.vue';

export default defineComponent({
  components: {
    AppSection,
    SectionHead,
  },
});
</script>

<style></style>
