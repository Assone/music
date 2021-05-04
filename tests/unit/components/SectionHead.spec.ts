import { shallowMount } from '@vue/test-utils';
import SectionHead from '@/components/SectionHead.vue';

describe('SectionHead.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(SectionHead, {
      propsData: { title: 'title' },
      stubs: ['router-link'],
    });

    expect(wrapper.classes()).toContain('section-head');
  });

  it('set props', () => {
    const title = 'this is a title';
    const description = 'this is a description';
    const avatar = 'this is a avatar';
    const next = { link: '/', text: 'next the link' };
    const wrapper = shallowMount(SectionHead, {
      propsData: { title, description, avatar, next },
      stubs: ['router-link'],
    });

    expect(wrapper.findComponent({ name: 'AppAvatar' }).exists()).toBeTruthy();
    expect(wrapper.find('.section-head__info h2').text()).toBe(title);
    expect(wrapper.find('.section-head__info p').text()).toBe(description);
    expect(wrapper.find('.section-head__link').text()).toBe(next.text);
  });
});
