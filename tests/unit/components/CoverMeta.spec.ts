import CoverMeta from '@/components/CoverMeta.vue';
import { shallowMount } from '@vue/test-utils';

describe('CoverMeta.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(CoverMeta, {
      stubs: ['router-link'],
    });

    expect(wrapper.classes()).toContain('cover-meta');
  });

  it('format Date', async () => {
    const time = new Date();
    const wrapper = shallowMount(CoverMeta, {
      stubs: ['router-link'],
    });

    expect(wrapper.find('.cover-info__time').exists()).toBe(false);

    await wrapper.setProps({ date: time.getTime() });
    expect(wrapper.find('.cover-info__time').text()).toBe(String(time.getFullYear()));

    await wrapper.setProps({ date: time.toLocaleString() });
    expect(wrapper.find('.cover-info__time').text()).toBe(time.toLocaleString());
  });

  it('format type', async () => {
    const wrapper = shallowMount(CoverMeta, {
      stubs: ['router-link'],
    });

    expect(wrapper.find('.cover-meta__info').exists()).toBe(false);

    await wrapper.setProps({ type: 'detail' });
    expect(wrapper.find('.cover-info__type').text()).toBe('detail');

    await wrapper.setProps({ type: 'EP/Single', size: 1 });
    expect(wrapper.find('.cover-info__type').text()).toBe('Single');
    await wrapper.setProps({ type: 'EP/Single', size: 2 });
    expect(wrapper.find('.cover-info__type').text()).toBe('EP');

    await wrapper.setProps({ type: 'Single' });
    expect(wrapper.find('.cover-info__type').text()).toBe('Single');
  });
});
