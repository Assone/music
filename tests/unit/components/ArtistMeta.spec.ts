import { shallowMount } from '@vue/test-utils';
import ArtistMeta from '@/components/ArtistMeta.vue';

const options = {
  name: 'name',
  avatar: 'avatar',
};

describe('ArtistMeta.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(ArtistMeta, {
      propsData: options,
    });

    expect(wrapper.classes()).toContain('artist-meta');
  });

  describe('Props', () => {
    it('set name', () => {
      const wrapper = shallowMount(ArtistMeta, {
        propsData: options,
      });

      expect(wrapper.find('.meta-info__name').text()).toBe('name');
    });

    it('set count', () => {
      const music = 1;
      const album = 2;
      const mv = 3;

      const wrapper = shallowMount(ArtistMeta, {
        propsData: Object.assign(options, { music, album, mv }),
      });

      expect(wrapper.find('.meta-info__source-count').text()).toContain(music);
      expect(wrapper.find('.meta-info__source-count').text()).toContain(album);
      expect(wrapper.find('.meta-info__source-count').text()).toContain(mv);
    });
  });
});
