export enum ConfigLayout {
  'Default',
  'Apple',
  'Spotify',
}
import logo from '@/assets/logo.png';

const config: IAppConfig = {
  title: 'SJBB',
  layout: 'Default',
  theme: 'auto',
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Setting', link: '/setting' },
  ],
  logo,
};

export default config;
