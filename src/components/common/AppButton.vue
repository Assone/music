<template lang="pug">
button.app-button(
  :class='componentClass',
  :autofocus='autofocus',
  :disabled='disabled',
  :type='nativeType',
  v-on='$listeners'
)
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppButton extends Vue {
  @Prop({ type: Boolean }) round?: boolean;

  @Prop({ type: Boolean }) circle?: boolean;

  @Prop({ type: Boolean }) disabled?: boolean;

  @Prop({ type: Boolean }) loading?: boolean;

  @Prop({ type: Boolean }) autofocus?: boolean;

  @Prop({ type: String, validator: (type) => ['button', 'submit', 'reset'].includes(type) })
  nativeType?: string;

  get componentClass() {
    return [
      {
        'is-round': this.round,
        'is-circle': this.circle,
        'is-disabled': this.disabled,
        'is-loading': this.loading,
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
@include b(app, button) {
  display: inline-block;
  cursor: pointer;

  padding: 5px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;

  font-size: 1rem;
  text-align: center;

  background: #fff;

  transition: 0.1s;

  & + & {
    margin-left: 1vw;
  }

  @include when(disabled) {
    cursor: not-allowed;
  }

  @include when(circle) {
    padding: 12px;
    border-radius: 100%;
  }

  @include when(round) {
    border-radius: 20px;
  }
}
</style>
