<template>
  <div class="view-login">
    <div class="flex flex-col">
      <label
        >Email: <input class="text-black" type="text" v-model="account"
      /></label>
      <label
        >Password: <input class="text-black" type="password" v-model="password"
      /></label>
      <AppButton :disabled="disabled" v-debounce.click="handleLogin"
        >Login</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppButton from "@/components/common/AppButton.vue";

import useLogin from "@/composables/useLogin";

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
