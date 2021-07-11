type IConfigNavLink = { text: string; to: string };

interface IAppConfig {
  logo: string;
  title: string;
  nav: IConfigNavLink[];
  layout?: "Apple" | "Spotify" | "Default";
  theme: "auto" | "dark" | "light";
  themeColor: `${number}, ${number}%, ${number}%`[];
  currentColorIndex: number;
}
