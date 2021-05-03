type IConfigNavLink = { text: string; link: string };

interface IAppConfig {
  layout?: 'Apple' | 'Spotify' | 'Default';
  nav: IConfigNavLink[];
  theme: 'auto' | 'dark' | 'light';
}
