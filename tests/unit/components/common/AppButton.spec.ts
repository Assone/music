import { shallowMount } from '@vue/test-utils';
import AppButton from '@/components/common/AppButton.vue';

describe('AppButton.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppButton);

    expect(wrapper.classes()).toContain('app-button');
  });

  it('set props', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: {
        round: true,
        circle: true,
        disabled: true,
        loading: true,
        autofocus: true,
        nativeType: 'submit',
      },
    });

    expect(wrapper.classes()).toContain('is-round');
    expect(wrapper.classes()).toContain('is-circle');
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.classes()).toContain('is-loading');
    expect(wrapper.element.getAttribute('autofocus')).toBeTruthy();
    expect(wrapper.element.getAttribute('type')).toBe('submit');
  });
});
