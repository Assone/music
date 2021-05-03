<template lang="pug">
.view-login
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  email = '';

  password = '';
}
</script>
