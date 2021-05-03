import { shallowMount } from '@vue/test-utils';
import AppProgress from '@/components/common/AppProgress.vue';

describe('AppProgress.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppProgress);

    expect(wrapper.classes()).toContain('app-progress');
  });

  it('set props', async () => {
    const wrapper = shallowMount(AppProgress);

    await wrapper.setData({ loading: true });
    expect(wrapper.element.style.top).toBe('0px');

    await wrapper.setProps({ position: 'bottom' });
    expect(wrapper.element.style.bottom).toBe('0px');
  });
});
