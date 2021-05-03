import { shallowMount } from '@vue/test-utils';
import AppMenu from '@/components/common/AppMenu.vue';

describe('AppMenu.vue', () => {
  it('created', () => {
    const wrapper = shallowMount(AppMenu);

    expect(wrapper.classes()).toContain('app-menu');
  });

  it('handle open', () => {
    const wrapper = shallowMount<
      AppMenu & { x: string; y: string; handleOpen: (e: MouseEvent) => void }
    >(AppMenu);

    const event = new MouseEvent('menu');
    wrapper.vm.handleOpen(event);

    expect(wrapper.vm.x).toBe(`${event.x + 15}px`);
    expect(wrapper.vm.y).toBe(`${event.y - 15}px`);
  });

  it('handle close', () => {
    const wrapper = shallowMount<AppMenu & { show: boolean; handleOpen: (e: MouseEvent) => void }>(
      AppMenu,
    );

    const event = new MouseEvent('menu');
    wrapper.vm.handleOpen(event);

    expect(wrapper.vm.show).toBe(true);

    window.dispatchEvent(new Event('scroll'));

    expect(wrapper.vm.show).toBe(false);
  });

  it('set lock', () => {
    const wrapper = shallowMount<AppMenu & { handleOpen: (e: MouseEvent) => void }>(AppMenu, {
      propsData: { lock: true },
    });

    const event = new MouseEvent('menu');
    wrapper.vm.handleOpen(event);

    expect(document.body.style.overflow).toBe('hidden');
  });
});
