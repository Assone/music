import { reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/apis";

export default function useLogin() {
  const router = useRouter();

  const auth = reactive({
    account: "",
    password: "",
  });

  const disabled = computed(() => auth.account === "" && auth.password === "");

  const handleLogin = () => {
    login(auth.account, auth.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("profile", JSON.stringify(res.profile));
        localStorage.setItem("account", JSON.stringify(res.account));

        router.push({ name: "Home" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    ...toRefs(auth),
    disabled,

    handleLogin,
  };
}
