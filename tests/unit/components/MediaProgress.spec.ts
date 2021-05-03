import MediaProgress from '@/components/MediaProgress.vue';
import { shallowMount } from '@vue/test-utils';

describe('MediaProgress.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(MediaProgress, {
      propsData: {
        max: 1,
        current: 0,
      },
    });

    expect(wrapper.classes()).toContain('media-progress');
  });

  it('mousedown', async () => {
    const wrapper = shallowMount<MediaProgress & { draging: boolean }>(MediaProgress, {
      propsData: {
        max: 1,
        current: 0,
      },
    });

    await wrapper.trigger('mousedown');
    expect(wrapper.vm.draging).toBe(true);
  });

  it('mouseup', async () => {
    const wrapper = shallowMount<MediaProgress & { draging: boolean }>(MediaProgress, {
      propsData: {
        max: 1,
        current: 0,
      },
    });

    await wrapper.setData({ draging: true });
    await wrapper.trigger('mouseup');

    expect(wrapper.emitted().change).toBeTruthy();
    setTimeout(() => {
      expect(wrapper.vm.draging).toBe(false);
    }, 50);
  });

  it('computed', async () => {
    const wrapper = shallowMount<MediaProgress & { value: number; lastValue: number }>(
      MediaProgress,
      {
        propsData: {
          max: 1,
          current: 0.5,
        },
      },
    );

    expect(wrapper.vm.value).toBe(0.5);

    await wrapper.setData({ draging: true });
    expect(wrapper.vm.value).toBe(0);

    await wrapper.setData({ value: 3 });
    expect(wrapper.vm.lastValue).toBe(3);
  });

  it('style', () => {
    const wrapper = shallowMount(MediaProgress, {
      propsData: {
        max: 1,
        current: 0.5,
      },
    });

    expect(wrapper.element.style.getPropertyValue('--progress')).toBe(`${(0.5 / 1) * 100}%`);
  });
});
