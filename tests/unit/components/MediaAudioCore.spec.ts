import { shallowMount } from '@vue/test-utils';
import MediaAudioCore from '@/components/MediaAudioCore.vue';

describe('MediaAudioCore.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(MediaAudioCore, { propsData: { status: true } });

    expect(wrapper.exists()).toBe(true);
  });

  it('set current time', () => {
    const wrapper = shallowMount<
      MediaAudioCore & { setCurrentTime: (time: number) => void; self: HTMLAudioElement }
    >(MediaAudioCore, {
      propsData: { status: true },
    });

    wrapper.vm.setCurrentTime(111);
    expect(wrapper.vm.self.currentTime).toBe(111);
  });

  describe('Watch', () => {
    it('change mute', async () => {
      const wrapper = shallowMount<MediaAudioCore & { self: HTMLAudioElement }>(MediaAudioCore, {
        propsData: { status: true },
      });

      expect(wrapper.vm.self.muted).toBe(false);

      await wrapper.setProps({ mute: true });
      expect(wrapper.vm.self.muted).toBe(true);
    });

    it('change volume', async () => {
      const wrapper = shallowMount<MediaAudioCore & { self: HTMLAudioElement }>(MediaAudioCore, {
        propsData: { status: true },
      });

      expect(wrapper.vm.self.volume).toBe(1);

      await wrapper.setProps({ volume: 0.5 });
      expect(wrapper.vm.self.volume).toBe(0.5);
    });

    it('change track', async () => {
      const wrapper = shallowMount<MediaAudioCore & { self: HTMLAudioElement }>(MediaAudioCore, {
        propsData: { status: false },
        mocks: {
          $api: {
            getSongUrl: (url: number) => Promise.resolve([{ url: `localhost://${url}` }]),
          },
        },
      });

      expect(wrapper.vm.self.src).toBe('');

      await wrapper.setProps({ track: 111 });
      expect(wrapper.vm.self.src).toBe(`localhost://111`);
    });
  });
});
