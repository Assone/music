import { shallowMount } from '@vue/test-utils';
import NavLinks from '@/components/NavLinks.vue';

describe('NavLinks.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: { links: [{ text: 'link1', href: '/' }] },
      stubs: ['router-link'],
    });

    expect(wrapper.classes()).toContain('nav-bar__links');
  });

  it('render item', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        links: [
          { text: 'link1', href: '/' },
          { text: 'link2', href: '/' },
        ],
      },
      stubs: ['router-link'],
    });

    expect(wrapper.findAll('.nav-links__item').length).toBe(2);
  });
});
