<template lang="pug">
main.app-main
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppMain extends Vue {}
</script>
