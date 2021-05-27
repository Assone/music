export enum ConfigLayout {
  'Default',
  'Apple',
  'Spotify',
}
import logo from '@/assets/logo.png';

const config: IAppConfig = {
  title: 'MUSIC',
  layout: 'Default',
  theme: 'auto',
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Search', link: '/search' },
    // { text: 'Setting', link: '/setting' },
  ],
  logo,
};

export default config;
