import { shallowMount } from '@vue/test-utils';
import AppImage from '@/components/common/AppImage.vue';

describe('AppImage.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppImage);

    expect(wrapper.classes()).toContain('app-image');
  });
});
