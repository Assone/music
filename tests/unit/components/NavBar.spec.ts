import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import NavBar from '@/components/NavBar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NavBar.vue', () => {
  let store: undefined | Store<Record<string, unknown>>;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        config: {
          namespaced: true,
          state: {
            nav: [
              { text: 'Home', link: '/' },
              { text: 'Explore', link: '/explore' },
              { text: 'Library', link: '/library' },
            ],
          },
        },
      },
    });
  });

  it('created', () => {
    const wrapper = shallowMount(NavBar, { localVue, store });

    expect(wrapper.classes()).toContain('nav-bar');
  });

  it('logo', () => {
    const wrapper = mount(NavBar, { localVue, store, stubs: ['router-link'] });

    expect(wrapper.getComponent({ name: 'NavBarTitle' }).exists()).toBeTruthy();
  });
});
