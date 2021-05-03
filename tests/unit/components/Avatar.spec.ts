import { shallowMount, RouterLinkStub, mount } from '@vue/test-utils';
import Avatar from '@/components/Avatar.vue';

describe('Avatar.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(Avatar);

    expect(wrapper.classes()).toContain('avatar');
  });

  it('set name', () => {
    const name = 'name';
    const wrapper = shallowMount(Avatar, {
      propsData: { name, id: 1 },
      stubs: { RouterLink: RouterLinkStub },
    });

    expect(wrapper.findComponent(RouterLinkStub).text()).toBe(name);
  });

  it('set id', async () => {
    const id = 1;
    const wrapper = mount(Avatar, {
      propsData: { id },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    // TODO: click test with router push

    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(`/artist/${id}`);
    expect(wrapper.find('.avatar__inner').classes()).toContain('can-click');
  });
});
