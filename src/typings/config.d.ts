type IConfigNavLink = { text: string; link: string };

interface IAppConfig {
  title: string;
  layout?: 'Apple' | 'Spotify' | 'Default';
  nav: IConfigNavLink[];
  theme: 'auto' | 'dark' | 'light';
  logo: string;
}
