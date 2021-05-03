import { mount, shallowMount } from '@vue/test-utils';
import MediaControl from '@/components/MediaControl.vue';

describe('MediaControl.vue', () => {
  let index = 0;
  let status = false;

  const play = () => {
    status = true;
  };
  const pause = () => {
    status = false;
  };
  const next = () => {
    index += 1;
  };
  const prev = () => {
    index -= 1;
  };
  const props = {
    status,
    play,
    pause,
    next,
    prev,
  };

  beforeEach(() => {
    index = 0;
    status = false;
  });

  it('created', () => {
    const wrapper = shallowMount(MediaControl, {
      propsData: props,
    });

    expect(wrapper.classes()).toContain('media-control');
  });

  it('click prev', async () => {
    const wrapper = mount(MediaControl, {
      propsData: props,
    });

    await wrapper.find('.media-control__prev').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(index).toBe(-1);
    });
  });

  it('click next', async () => {
    const wrapper = mount(MediaControl, {
      propsData: props,
    });

    await wrapper.find('.media-control__next').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(index).toBe(1);
    });
  });

  it('click switch status', async () => {
    const wrapper = mount(MediaControl, {
      propsData: props,
    });

    await wrapper.find('.media-control__status').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(status).toBe(true);
      expect(wrapper.find('.media-control__status').props().type).toBe('media-play');
    });

    await wrapper.setProps({ status: true });
    await wrapper.find('.media-control__status').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(status).toBe(false);
      expect(wrapper.find('.media-control__status').props().type).toBe('media-pause');
    });
  });
});
