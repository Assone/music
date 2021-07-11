import { Ref, computed } from "vue";
import { usePreferredDark } from "@vueuse/core";

export const useSetTheme = (theme: "auto" | "dark" | "light") => {
  if (theme === "auto") {
    const isDark = usePreferredDark();

    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }
};

export const useThemeColorHSL = (colorRaw: Ref<IAppConfig["themeColor"][0]>) =>
  computed(() => {
    const [h, s, l] = colorRaw.value.split(", ");

    return {
      h,
      s,
      l,
    };
  });
