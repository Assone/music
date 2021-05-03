import { shallowMount } from '@vue/test-utils';
import TrackListItem from '@/components/TrackListItem.vue';

const props = {
  album: {
    cover: 'https://p2.music.126.net/-Y4yyvlfx_W2CjLo0mEOwQ==/109951165875486814.jpg',
    id: 125149262,
    name: "Fearless (Taylor's Version)",
  },
  artists: [{ id: 44266, name: 'Taylor Swift' }],
  duration: 241591,
  id: 1832431765,
  name: 'Fearless (Taylor’s Version)',
};

describe('TrackListItem.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(TrackListItem, {
      propsData: { ...props, type: 'album', index: 1 },
      stubs: ['router-link'],
    });

    expect(wrapper.classes()).toContain('track-list__item');
  });

  it('computed', () => {
    const wrapper = shallowMount<TrackListItem & { cover?: string; albumName?: string }>(
      TrackListItem,
      {
        propsData: { ...props, type: 'album', index: 1 },
        stubs: ['router-link'],
      },
    );

    expect(wrapper.find('.track-item__time').text()).toBe('04:01');
    expect(wrapper.vm.albumName).toBe(props.album.name);
    expect(wrapper.vm.cover).toBe(props.album.cover);
  });

  describe('render', () => {
    it('if type is album', () => {
      const wrapper = shallowMount(TrackListItem, {
        propsData: { ...props, type: 'album', index: 1 },
        stubs: ['router-link'],
      });

      expect(wrapper.find('.track-item__index').exists()).toBeTruthy();
    });

    it('if type is playlist', () => {
      const wrapper = shallowMount(TrackListItem, {
        propsData: { ...props, type: 'playlist' },
        stubs: ['router-link'],
      });

      expect(wrapper.find('.track-item__cover').exists()).toBeTruthy();
      expect(wrapper.find('.track-item__album').exists()).toBeTruthy();
    });

    it('other props', () => {
      const wrapper = shallowMount(TrackListItem, {
        propsData: { ...props, type: 'playlist' },
        stubs: ['router-link'],
      });

      expect(wrapper.find('.track-item__name').text()).toBe(props.name);
      expect(wrapper.find('.track-item__artists').element.children.length).toBe(1);
      expect(wrapper.find('.track-item__time').exists()).toBeTruthy();
    });
  });
});
