import { mount, shallowMount } from '@vue/test-utils';
import ExploreTab from '@/components/ExploreTab.vue';

const tabs = [
  { url: '/home', text: 'home' },
  { url: '/album', text: 'album' },
];

describe('ExploreTab.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(ExploreTab, {
      propsData: {
        tabs,
      },
    });

    expect(wrapper.classes()).toContain('explore-tabs');
  });

  it('render', () => {
    const wrapper = mount(ExploreTab, {
      propsData: {
        tabs,
      },
    });

    expect(wrapper.findAllComponents({ name: 'AppButton' }).length).toBe(tabs.length);
  });
});
