type IConfigNavLink = { text: string; to: string };

interface IAppConfig {
  title: string;
  layout?: "Apple" | "Spotify" | "Default";
  nav: IConfigNavLink[];
  theme: "auto" | "dark" | "light";
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  logo: string;
}
