<template>
  <div class="view-login">
    <div class="flex flex-col">
      <label>Email: <input v-model="account" class="text-black" type="text" /></label>
      <label>Password: <input v-model="password" class="text-black" type="password" /></label>
      <AppButton v-debounce.click="handleLogin" :disabled="disabled"> Login </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppButton from '@/components/common/AppButton.vue';

import useLogin from '@/composables/useLogin';

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const { account, password, disabled, handleLogin } = useLogin();

    return {
      account,
      password,
      disabled,

      handleLogin,
    };
  },
});
</script>
