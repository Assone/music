<template>
  <label class="app-radio text-sm" :aria-checked="model === label">
    <!-- :aria-disabled="isDisabled" -->
    <span class="inline-flex align-middle cursor-pointer">
      <span
        class="app-radio__inner relative inline-block h-4 w-4 rounded-3xl"
        :class="[`bg-${pointColor}-500`, { 'is-checked': model === label }]"
      />
      <input
        class="hidden"
        type="radio"
        v-model="model"
        :value="label"
        :name="name"
        aria-hidden="true"
      />
    </span>
    <span class="ml-2" v-if="$slots.default || showLabel">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, toRefs } from "vue";
import { radioGroupKey } from "./AppRadioGroup.vue";

export default defineComponent({
  props: {
    label: [String, Number],
    modelValue: {
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    pointColor: {
      type: String as PropType<
        | "gray"
        | "red"
        | "yellow"
        | "green"
        | "blue"
        | "indigo"
        | "purple"
        | "pink"
      >,
      default: "blue",
    },
    showLabel: Boolean,
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const radioGroup = inject(radioGroupKey);
    const isGroup = computed(() => radioGroup?.name === "AppRadioGroup");

    const model = computed({
      get() {
        return isGroup.value ? radioGroup!.modelValue : modelValue.value;
      },
      set(val: string | number | boolean) {
        if (isGroup.value) {
          radioGroup?.changeEvent(val);
        } else {
          emit("update:modelValue", val);
        }
      },
    });

    return {
      model,
    };
  },
});
</script>

<style lang="scss">
@include b(app, radio) {
  @include e(inner) {
    &::before {
      content: "";

      position: absolute;
      top: 50%;
      left: 50%;

      width: 4px;
      height: 4px;
      border-radius: 100%;

      background-color: #fff;

      transition: transform 0.15s ease-in;
      transform: translate(-50%, -50%) scale(0);
    }

    @include when(checked) {
      &::before {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}

@include b(safe-list) {
  @apply bg-gray-500 bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500;
}

// @include b(point) {
//   @include e(gray) {
//     @apply bg-gray-500;
//   }

//   @include e(red) {
//     @apply bg-red-500;
//   }

//   @include e(yellow) {
//     @apply bg-yellow-500;
//   }

//   @include e(green) {
//     @apply bg-green-500;
//   }

//   @include e(blue) {
//     @apply bg-blue-500;
//   }

//   @include e(indigo) {
//     @apply bg-indigo-500;
//   }

//   @include e(purple) {
//     @apply bg-purple-500;
//   }

//   @include e(pink) {
//     @apply bg-pink-500;
//   }
// }
</style>
