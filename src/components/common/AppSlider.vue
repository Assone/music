<template>
  <article
    class="app-slider"
    :class="[{ 'is-vertical': vertical }]"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    @click="handleSiderClick"
    ref="slider"
  >
    <div class="app-slider__track"></div>
    <div
      class="app-slider__dot"
      :class="{ 'is-hover': hovering, dragging: dragging }"
      tabindex="0"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousedown="handleThumbDown"
      @touchstart="handleThumbDown"
      @focus="handleMouseEnter"
      @blur="handleMouseLeave"
    >
      <div class="app-slider__tip tip" v-if="showTooltip">
        <div class="tip__inner">
          <span class="tip__text">
            {{ tip }}
          </span>
        </div>
      </div>
      <div class="app-slider__thumb"></div>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, toRefs } from 'vue';
import { throttle } from 'lodash-es';

import { useElementSize } from '@/hooks';

const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number;
  let clientY: number;
  if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY;
    clientX = (event as TouchEvent).touches[0].clientX;
  } else {
    clientY = (event as MouseEvent).clientY;
    clientX = (event as MouseEvent).clientX;
  }
  return {
    clientX,
    clientY,
  };
};

export default defineComponent({
  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    formatTooltip: {
      type: Function as PropType<(val: number) => number | string>,
      default: undefined,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '100px',
    },
    background: {
      type: String,
      default: '#ccc',
    },
    trackBackground: {
      type: String,
      default: '#3498db',
    },
    width: Number,
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const {
      modelValue,
      min,
      max,
      formatTooltip,
      vertical,
      height,
      background,
      trackBackground,
      step,
      width,
    } = toRefs(props);
    const initData = reactive({
      value: 0,
      oldValue: 0,
      sliderSize: 1,
      dragging: false,
      hovering: false,
    });
    const dotData = reactive({
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
    });
    const slider = ref<HTMLElement>();

    const precision = computed(() => {
      let precisions = [props.min, props.max, props.step].map((item) => {
        let decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    });
    const resetSize = () => {
      if (slider.value) {
        initData.sliderSize =
          slider.value[
            `client${vertical.value ? 'Height' : 'Width'}` as 'clientHeight' | 'clientWidth'
          ];
      }
    };

    const value = computed(() => (initData.dragging ? initData.value : modelValue.value));

    const style = computed(() => ({
      width: width?.value ? `${width.value}px` : vertical.value ? '5px' : '100%',
      height: vertical.value ? height.value : '5px',
      background: background.value,
      trackBackground: trackBackground.value,
      trackWidth: vertical.value
        ? '100%'
        : `${((value.value - min.value) / (max.value - min.value)) * 100}%`,
      trackHeight: vertical.value
        ? `${((value.value - min.value) / (max.value - min.value)) * 100}%`
        : '100%',
    }));
    const tip = computed(() =>
      formatTooltip.value ? formatTooltip.value(value.value) : value.value,
    );

    const currentPosition = computed(() => {
      return `${((props.modelValue - min.value) / (max.value - min.value)) * 100}%`;
    });
    const handleSiderClick = (evt: MouseEvent) => {
      const { width } = useElementSize(slider.value as HTMLElement);
      const { offsetX, clientY } = evt;

      if (vertical.value) {
        emit(
          'update:modelValue',
          (slider.value!.getBoundingClientRect().bottom - clientY) * 0.01 * max.value,
        );
      } else {
        emit('update:modelValue', (offsetX / width) * max.value);
      }
    };
    const handleMouseEnter = () => {
      initData.hovering = true;
    };
    const handleMouseLeave = () => {
      initData.hovering = false;
    };
    const onDragStart = (evt: MouseEvent | TouchEvent) => {
      initData.dragging = true;

      const { clientX, clientY } = getClientXY(evt);
      if (props.vertical) {
        dotData.startY = clientY;
      } else {
        dotData.startX = clientX;
      }

      initData.value = modelValue.value;
      resetSize();
      dotData.startPosition = parseFloat(currentPosition.value);
      dotData.newPosition = dotData.startPosition;
    };
    const onDragging = throttle((evt: MouseEvent | TouchEvent) => {
      if (initData.dragging) {
        const { clientX, clientY } = getClientXY(evt);
        let diff: number;

        if (props.vertical) {
          dotData.currentY = clientY;
          diff = ((dotData.startY - dotData.currentY) / initData.sliderSize) * 100;
        } else {
          dotData.currentX = clientX;
          diff = ((dotData.currentX - dotData.startX) / initData.sliderSize) * 100;
        }

        dotData.newPosition = dotData.startPosition + diff;
        setPosition(dotData.newPosition);
      }
    }, 10);
    const onDragEnd = () => {
      if (initData.dragging) {
        setTimeout(() => {
          initData.dragging = false;
          emit('update:modelValue', initData.value);
        }, 30);

        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('touchmove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchend', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
      }
    };
    const handleThumbDown = (evt: MouseEvent | TouchEvent) => {
      onDragStart(evt);
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('touchmove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchend', onDragEnd);
      window.addEventListener('contextmenu', onDragEnd);
    };
    const setPosition = (newPosition: number) => {
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }

      const lengthPerStep = 100 / ((max.value - min.value) / step.value);
      const steps = Math.round(newPosition / lengthPerStep);
      let value = steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value;
      value = parseFloat(value.toFixed(precision.value));

      initData.value = value;
      emit('input', value);
    };

    const { hovering, dragging } = toRefs(initData);

    return {
      slider,

      style,
      tip,

      initData,
      dotData,

      hovering,
      dragging,

      handleSiderClick,
      handleMouseEnter,
      handleMouseLeave,
      handleThumbDown,
    };
  },
});
</script>

<style lang="scss">
@include b(app, slider) {
  display: flex;
  align-items: center;

  width: v-bind('style.width');
  height: v-bind('style.height');

  background: v-bind('style.background');

  @include when(vertical) {
    flex-direction: column-reverse;
  }

  @include e(track) {
    width: v-bind('style.trackWidth');
    height: v-bind('style.trackHeight');

    transition: all 0.5s;

    background: v-bind('style.trackBackground');
  }

  @include e(dot) {
    position: relative;

    width: 14px;
    height: 14px;
    transition: left 0.5s ease 0s;

    @include when(hover) {
      .tip {
        display: block;
      }
    }
  }

  @include e(thumb) {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 2px 1px rgb(0 0 0 / 32%);
  }
}

@include b(tip) {
  position: absolute;
  display: none;
  top: -10px;
  left: 50%;

  transform: translate(-50%, -100%);

  @include e(inner) {
    font-size: 14px;
    white-space: nowrap;
    padding: 2px 5px;
    min-width: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    border-color: #3498db;
    background-color: #3498db;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      height: 0;
      width: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 5px;
      border-top-color: inherit;
    }
  }
}
</style>
