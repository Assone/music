import { mount, shallowMount } from '@vue/test-utils';
import AppLink from '@/components/common/AppLink.vue';
import OutboundLink from '@/components/icons/OutboundLink.vue';

describe('AppLink.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppLink);

    expect(wrapper.classes()).toContain('app-link');
  });

  it('render slot', () => {
    const templateDefault = '<span>default</span>';
    const wrapper = shallowMount(AppLink, {
      slots: {
        default: templateDefault,
      },
    });

    expect(wrapper.find('.app-link__content').html()).toContain(templateDefault);
  });

  it('set disabled', () => {
    const disabled = true;
    const wrapper = shallowMount(AppLink, {
      propsData: {
        disabled,
      },
    });

    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('set underline', () => {
    const underline = true;
    const wrapper = shallowMount(AppLink, {
      propsData: { underline },
    });

    expect(wrapper.classes()).toContain('is-underline');
  });

  it('set external', () => {
    const isExternal = true;
    const wrapper = mount(AppLink, {
      propsData: { isExternal },
    });

    expect(wrapper.findComponent(OutboundLink).exists()).toBeTruthy();
  });
});
