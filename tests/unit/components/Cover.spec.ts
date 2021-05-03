import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import VurRouter from 'vue-router';
import Cover from '@/components/Cover.vue';

const localVue = createLocalVue();
const router = new VurRouter();
localVue.use(VurRouter);

describe('Cover.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(Cover);

    expect(wrapper.classes()).toContain('cover');
  });

  it('computed canto', async () => {
    const wrapper = shallowMount<Cover & { canTo: boolean }>(Cover);

    expect(wrapper.vm.canTo).toBe(false);

    await wrapper.setProps({ type: 'playlist', id: 1 });
    expect(wrapper.vm.canTo).toBe(true);
  });

  it('trigger click', async () => {
    const type = 'playlist';
    const id = 1;
    const wrapper = shallowMount(Cover, {
      localVue,
      router,
    });

    await wrapper.setProps({ type });
    await wrapper.find('.cover-container').trigger('click');

    expect(wrapper.vm.$route.path).toBe('/');

    await wrapper.setProps({ type, id });
    await wrapper.find('.cover-container').trigger('click');

    expect(wrapper.vm.$route.path).toBe(`/${type}/${id}`);
  });

  it('set class', () => {
    const wrapper = mount(Cover, {
      propsData: { type: 'playlist', id: 1, square: true },
    });

    expect(wrapper.find('.cover-container__image').classes()).toContain('can-click');
    expect(wrapper.find('.cover-container__image').classes()).toContain('is-square');
  });
});
