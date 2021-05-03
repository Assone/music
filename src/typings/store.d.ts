interface SRootState {
  version: string;
}

interface SMediaState {
  play: boolean;
  model: 'default' | 'loop' | 'single' | 'random';
  activeIndex: number;
  tracks: number[];
  volume: number;
  mute: boolean;
}

type SConfigState = IAppConfig;

interface SAllState extends SRootState {
  config: SConfigState;
}
