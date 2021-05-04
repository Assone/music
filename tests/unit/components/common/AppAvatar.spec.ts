import { shallowMount, RouterLinkStub, mount } from '@vue/test-utils';
import AppAvatar from '@/components/common/AppAvatar.vue';

describe('AppAvatar.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppAvatar);

    expect(wrapper.classes()).toContain('app-avatar');
  });

  // it('set name', () => {
  //   const name = 'name';
  //   const wrapper = shallowMount(AppAvatar, {
  //     propsData: { name, id: 1 },
  //     stubs: { RouterLink: RouterLinkStub },
  //   });

  //   expect(wrapper.findComponent(RouterLinkStub).text()).toBe(name);
  // });

  // it('set id', async () => {
  //   const id = 1;
  //   const wrapper = mount(AppAvatar, {
  //     propsData: { id },
  //     stubs: {
  //       RouterLink: RouterLinkStub,
  //     },
  //   });

  //   // TODO: click test with router push

  //   expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(`/artist/${id}`);
  //   expect(wrapper.find('.avatar__inner').classes()).toContain('can-click');
  // });
});
