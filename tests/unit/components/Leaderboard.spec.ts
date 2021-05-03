import { shallowMount } from '@vue/test-utils';
import Leaderboard from '@/components/Leaderboard.vue';

describe('Leaderboard.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(Leaderboard, {});

    expect(wrapper.classes()).toContain('leaderboard');
  });
});
