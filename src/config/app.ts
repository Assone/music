import logo from '@/assets/logo.png';

// eslint-disable-next-line no-shadow
export enum ConfigLayout {
  'Default',
  'Apple',
  'Spotify',
}

const config: IAppConfig = {
  logo,
  title: 'MUSIC',
  layout: 'Default',
  nav: [
    { text: 'nav.home', to: '/' },
    { text: 'nav.setting', to: '/setting' },
    { text: 'nav.search', to: '/search' },
    { text: 'login', to: '/login' },
  ],
  theme: 'auto',
  themeColor: [
    '220, 9%, 46%',
    '0, 84%, 60%',
    '38, 92%, 50%',
    '160, 84%, 39%',
    '217, 91%, 60%',
    '239, 84%, 67%',
    '258, 90%, 66%',
  ],
  currentColorIndex: 3,
};

export default config;
