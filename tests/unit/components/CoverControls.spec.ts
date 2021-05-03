import CoverControls from '@/components/CoverControls.vue';
import { shallowMount } from '@vue/test-utils';

describe('CoverControls.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(CoverControls);

    expect(wrapper.classes()).toContain('cover-controls');
  });
});
