import { mount, shallowMount } from '@vue/test-utils';
import NavBarTitle from '@/components/NavBarTitle.vue';

describe('NavBarTitle.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(NavBarTitle, {
      propsData: {
        title: 'title',
      },
      stubs: ['router-link'],
    });

    expect(wrapper.classes()).toContain('nav-bar__title');
  });

  it('set logo', () => {
    const wrapper = mount(NavBarTitle, {
      propsData: {
        logo: 'src/logo.png',
      },
      stubs: ['router-link'],
    });

    expect(wrapper.findComponent({ name: 'AppImage' }).exists()).toBe(true);
  });

  it('set title', () => {
    const title = 'this is a title';
    const wrapper = shallowMount(NavBarTitle, {
      propsData: {
        title,
      },
      stubs: ['router-link'],
    });

    expect(wrapper.text()).toBe(title);
  });
});
