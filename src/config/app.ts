import logo from "@/assets/logo.png";

const config: IAppConfig = {
  title: "MUSIC",
  layout: "Default",
  theme: "auto",
  color: "green",
  nav: [
    { text: "nav.home", to: "/" },
    { text: "nav.setting", to: "/setting" },
  ],
  logo,
};

export enum ConfigLayout {
  "Default",
  "Apple",
  "Spotify",
}

export default config;
