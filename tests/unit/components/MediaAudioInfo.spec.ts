import { shallowMount } from '@vue/test-utils';
import MediaAudioInfo from '@/components/MediaAudioInfo.vue';

describe('MediaAudioInfo.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(MediaAudioInfo, {
      propsData: {
        track: 111,
      },
      mocks: {
        $api: {
          getSongDetail: (value: number) =>
            Promise.resolve({ songs: [{ album: { cover: value } }] }),
        },
      },
    });

    expect(wrapper.classes()).toContain('media-audio__info');
  });

  // it('computed', () => {
  //   const cover = 'cover';
  //   const id = '1';
  //   const name = 'name';
  //   const songs = [{ album: { cover }, name, artists: [{ id, name }] }];

  //   const wrapper = shallowMount<
  //     MediaAudioInfo & { name: string; cover: string; artists: { id: number; name: string }[] }
  //   >(MediaAudioInfo, {
  //     propsData: {
  //       track: 111,
  //     },
  //     mocks: {
  //       $api: {
  //         getSongDetail: () =>
  //           Promise.resolve({
  //             songs,
  //           }),
  //       },
  //     },
  //   });

  //   wrapper.vm.$nextTick(() => {
  //     expect(wrapper.vm.cover).toBe(cover);
  //     expect(wrapper.vm.name).toBe(name);
  //     expect(wrapper.vm.artists[0].id).toBe(id);
  //     expect(wrapper.vm.artists[0].name).toBe(name);
  //   });
  // });
});
