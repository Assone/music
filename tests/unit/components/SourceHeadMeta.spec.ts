import SourceHeadMeta from '@/components/SourceHeadMeta.vue';
import { shallowMount } from '@vue/test-utils';

const options = {
  title: 'titel',
  user: {
    id: 123,
    name: 'name',
  },
};

describe('SourceHeadMeta.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(SourceHeadMeta, { propsData: options, stubs: ['router-link'] });

    expect(wrapper.classes()).toContain('source-meta');
  });

  describe('Props', () => {
    it('set title', async () => {
      const title = 'this is a new title';
      const wrapper = shallowMount(SourceHeadMeta, { propsData: options, stubs: ['router-link'] });

      expect(wrapper.find('.source-meta__title').text()).toBe(options.title);

      await wrapper.setProps({ title });
      expect(wrapper.find('.source-meta__title').text()).toBe(title);
    });

    it('set description', () => {
      const template = '<span>description</span>';
      const wrapper = shallowMount(SourceHeadMeta, {
        propsData: { ...options, description: template },
        stubs: ['router-link'],
      });

      expect(wrapper.find('.source-meta__description').html()).toContain(template);
    });

    it('set time', () => {
      const time = new Date().toLocaleString();
      const wrapper = shallowMount(SourceHeadMeta, {
        propsData: { ...options, time },
        stubs: ['router-link'],
      });

      expect(wrapper.find('.source-meta__time').text()).toBe(time);
    });
  });
});
