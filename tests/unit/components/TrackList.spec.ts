import { shallowMount } from '@vue/test-utils';
import TrackList from '@/components/TrackList.vue';
import Queue from '@/models/tools/Queue';
import MSong from '@/models/Song';

const mocks = {
  $api: {
    getSongDetail: (ids: number[]) =>
      Promise.resolve({
        songs: ids.map(
          (id) =>
            new MSong(({
              id,
              name: 'name',
              ar: [],
              dt: id,
              al: { id, name: 'name', picUrl: 'cover' },
            } as unknown) as IrSongDetail),
        ),
      }),
  },
};

describe('TrackList.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(TrackList);

    expect(wrapper.classes()).toContain('track-list');
  });

  it('watch songs change', async () => {
    const wrapper = shallowMount<TrackList & { data: number[] }>(TrackList);

    expect(wrapper.vm.data.length).toBeFalsy();

    await wrapper.setProps({
      songs: [
        { type: 'album', index: 1, name: 'name', id: 1, duration: 111, album: {}, artists: [] },
        { type: 'album', index: 1, name: 'name', id: 2, duration: 111, album: {}, artists: [] },
      ],
    });
    expect(wrapper.vm.data.length).toBe(2);
  });

  it('handleLoadingMore', async () => {
    const responseData = [1, 2, 3];
    const responseDataNext = [4, 5, 6];
    const wrapper = shallowMount<
      TrackList & { data: MSong[]; ids: Queue<number[]>; handleLoadingMore: () => Promise<void> }
    >(TrackList, {
      propsData: {
        trackIds: responseData,
      },
      mocks,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.data.length).toBe(responseData.length);

    wrapper.vm.ids.in(responseDataNext);
    await wrapper.vm.handleLoadingMore();

    expect(wrapper.vm.data.length).toBe(responseData.length + responseDataNext.length);
  });

  it('handleScroll', async () => {
    const wrapper = shallowMount<TrackList & { data: null[] }>(TrackList, {
      propsData: {
        trackIds: Array(60)
          .fill(null)
          .map((_v, i) => i),
      },
      mocks,
    });

    expect(wrapper.vm.data.length).toBe(0);

    const event = new Event('scroll');
    window.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.data.length).toBe(60);
  });
});
