import { shallowMount } from '@vue/test-utils';
import AppSection from '@/components/common/AppSection.vue';

describe('AppSection.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppSection);

    expect(wrapper.element.tagName).toBe('SECTION');
  });

  it('set title', () => {
    const title = 'this is a title';
    const wrapper = shallowMount(AppSection, { propsData: { title } });

    expect(wrapper.find('h2').text()).toBe(title);
  });

  it('render slot', () => {
    const headTemplate = '<span>head</span>';
    const defaultTemplate = '<span>default</span>';
    const wrapper = shallowMount(AppSection, {
      slots: { head: headTemplate, default: defaultTemplate },
    });

    expect(wrapper.html()).toContain(headTemplate);
    expect(wrapper.find('.app-section__container').html()).toContain(defaultTemplate);
  });
});
