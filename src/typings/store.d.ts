interface SRootState {
  version: string;
  account?: {
    anonimousUser: boolean;
    ban: number;
    baoyueVersion: number;
    createTime: number;
    donateVersion: number;
    id: number;
    salt: string;
    status: number;
    tokenVersion: number;
    type: number;
    userName: string;
    vipType: number;
    viptypeVersion: number;
    whitelistAuthority: number;
  };
  profile?: {
    accountStatus: number;
    authStatus: number;
    authority: number;
    avatarDetail: null;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    eventCount: number;
    expertTags: null;
    experts: {};
    followed: boolean;
    followeds: number;
    follows: number;
    gender: number;
    mutual: boolean;
    nickname: string;
    playlistBeSubscribedCount: number;
    playlistCount: number;
    province: number;
    remarkName: null;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
  };
}

interface SMediaState {
  play: boolean;
  show: boolean;
  model: 'default' | 'loop' | 'single' | 'random';
  activeIndex: number;
  tracks: number[];
  volume: number;
  mute: boolean;
  type?: 'playlist' | 'album';
  id?: number;
}

type SConfigState = IAppConfig;

interface SAllState extends SRootState {
  config: SConfigState;
  media: SMediaState;
}
