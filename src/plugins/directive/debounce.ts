import { Directive, DirectiveBinding } from "vue";
import { debounce as lodashDebounce } from "lodash-es";
import { isFunction } from "@/utils";

const debounce: Directive = {
  beforeMount(el, binding) {
    const { value } = binding;
    const time = Number(el.dataset.throttle) || 1000;

    el.debounceEvent = lodashDebounce(value, time);
  },

  mounted(el: HTMLElement, binding) {
    const { modifiers, value } = binding;
    const time = Number(el.dataset.throttle) || 1000;

    if (isFunction(value)) {
      for (const key in modifiers) {
        if (modifiers[key]) {
          el.addEventListener(key, lodashDebounce(value, time));
        }
      }
    } else {
      console.error("value must is a function");
    }
  },
};

export default debounce;
