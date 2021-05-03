<template lang="pug">
.view-disabled
  h1 Disabled
  p 当前功能被禁用，请到#[router-link(to='/setting') 设置]开启
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Disabled extends Vue {}
</script>
