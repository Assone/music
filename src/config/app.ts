// eslint-disable-next-line no-shadow
export enum ConfigLayout {
  'Default',
  'Apple',
  'Spotify',
}

const config: IAppConfig = {
  layout: 'Default',
  theme: 'auto',
  nav: [
    { text: 'Home', link: '/' },
    // { text: 'Explore', link: '/explore' },
    // { text: 'Radio', link: '/radio' },
    { text: 'Library', link: '/library' },
  ],
};

export default config;
