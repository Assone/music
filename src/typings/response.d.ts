/* eslint-disable camelcase */

interface IrMeta {
  id: number;
  name: string;
}

interface IrURL {
  code: number;
  expi: number;
  fee: number;
  id: number;
  md5: string;
  url: string;
  size: number;
}

interface IrTime {
  createTime?: number;
  trackNumberUpdateTime?: number;
  trackUpdateTime?: number;
  updateTime?: number;
  publishTime?: number;
}

interface IrCount {
  cloudTrackCount?: number;
  commentCount?: number;
  playCount?: number;
  shareCount?: number;
  subscribedCount?: number;
  trackCount?: number;
  playCount?: number;
  trackCount?: number;
  subCount?: number;
}

interface IrUser {
  accountStatus: number;
  anchor: boolean;
  authStatus: number;
  authenticationTypes: number;
  authority: number;
  avatarDetail: {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
  } | null;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarImgId_str: string;
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
  expertTags: string[];
  experts: { [key: number]: string };
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: null;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

interface IrTrack {
  chargeInfoList: {
    chargeMessage: null;
    chargeType: number;
    chargeUrl: null | string;
    rate: number;
  }[];
  cp: number;
  cs: boolean;
  dl: number;
  downloadMaxbr: number;
  fee: number;
  fl: number;
  flag: number;
  freeTrialPrivilege: { resConsumable: boolean; userConsumable: boolean };
  id: number;
  maxbr: number;
  paidBigBang: boolean;
  payed: number;
  pc: null;
  pl: number;
  playMaxbr: number;
  preSell: boolean;
  realPayed: number;
  sp: number;
  st: number;
  subp: number;
  toast: boolean;
}

interface IrTrackIds {
  alg: null | string;
  at: number;
  id: number;
  t: number;
  v: number;
}

interface IrMetaSource extends IrMeta {
  alg?: string;
  canDislike?: boolean;
  copywriter: string;
  highQuality?: boolean;
  picUrl: string;
  type: number;
}

interface IrPlaylistDetail extends IrMetaSource, IrTime, IrCount {
  adType: number;
  // backgroundCoverId: number;
  backgroundCoverUrl: null | string;
  commentThreadId: string;
  // coverImgId: number;
  // coverImgId_str: string;
  coverImgUrl: string;
  creator: IrUser;
  description: string;
  englishTitle: null;
  newImported: boolean;
  opRecommend: boolean;
  ordered: boolean;
  privacy: number;
  remixVideo: null;
  specialType: number;
  status: number;
  subscribed: null;
  subscribers: IrUser[];
  tags: string[];
  titleImage: number;
  titleImageUrl: null;
  trackIds: IrTrackIds[];
  tracks: IrTrack[];
  updateFrequency: null;
  userId: number;
  videoIds: null;
  videos: null;
}

interface IrArtistDetail extends IrMeta, Pick<IrTime, 'publishTime'> {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  img1v1Id?: number;
  img1v1Id_str?: string;
  img1v1Url?: string;
  musicSize: number;
  picId: number;
  picId_str: string;
  picUrl?: string;
  topicPerson: number;
  trans: string;
  transNames: string[];

  cover?: string;
  identifyTag: null | string[];
  identities: [];
  mvSize: number;
  rank: { rank: number; type: number };
  accountId?: number;

  followed: boolean;
}

type GetRecPlaylistResponse = Pick<
  IrPlaylistDetail,
  | 'alg'
  | 'canDislike'
  | 'copywriter'
  | 'highQuality'
  | 'id'
  | 'name'
  | 'picUrl'
  | 'playCount'
  | 'trackCount'
  | 'trackNumberUpdateTime'
> & { type: number };

interface IrAlbumDetail extends IrMeta, Pick<IrTime, 'publishTime'> {
  alias: [];
  artist: IrArtistDetail;
  artists: IrArtistDetail[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: string;
  companyId: number;
  copyrightId: number;
  description: string;
  mark: number;
  info: {
    commentCount: number;
    commentThread: {
      commentCount: number;
      hotCount: number;
      id: string;
      latestLikedUsers: null;
      likedCount: number;
      resourceId: number;
      resourceInfo: {
        creator: null;
        encodedId: null;
        id: number;
        imgUrl: string;
        name: string;
        subTitle: null;
        userId: number;
        webUrl: null;
      };
      resourceOwnerId: number;
      resourceTitle: string;
      resourceType: number;
      shareCount: number;
    };
    comments: null;
    latestLikedUsers: null;
    liked: boolean;
    likedCount: number;
    resourceId: number;
    resourceType: number;
    shareCount: number;
    threadId: string;
  };
  onSale: boolean;
  paid: boolean;
  pic: Date;
  picId: Date;
  picId_str: string;
  picUrl: string;
  size: number;
  songs: [];
  subType: string;
  status: number;
  tags: string;
  type: string;
}

interface IrSongDetail extends IrMeta {
  a: null;
  al: { id: number; name: string; picUrl: string; tns: []; pic_str: string };
  alia: [];
  ar: { id: number; name: string; tns: []; alias: [] }[];
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: null;
  djId: number;
  dt: number;
  fee: number;
  ftype: number;
  h: { br: number; fid: number; size: number; vd: number };
  l: { br: number; fid: number; size: number; vd: number };
  m: { br: number; fid: number; size: number; vd: number };
  mark: number;
  mst: number;
  mv: number;
  no: number;
  noCopyrightRcmd: null;
  originCoverType: number;
  originSongSimpleData: {
    songId: number;
    name: string;
    artists: { id: number; name: string }[];
    albumMeta: { id: number; name: string };
  };
  pop: number;
  pst: number;
  publishTime: number;
  resourceState: boolean;
  rt: string;
  rtUrl: null;
  rtUrls: [];
  rtype: number;
  rurl: null;
  s_id: number;
  single: number;
  st: number;
  t: number;
  v: number;
}

interface IrRecSongDetail
  extends IrMeta,
    Pick<
      IrSongDetail,
      'no',
      'copyright',
      'originCoverType',
      'originSongSimpleData',
      'noCopyrightRcmd'
    > {
  album: IrAlbumDetail;
  alias: [];
  artists: IrArtistDetail[];
  audition: null;
  bMusic: {
    bitrate: number;
    dfsId: number;
    extension: string;
    id: number;
    name: null;
    playTime: number;
    size: number;
    sr: number;
    volumeDelta: number;
  };
  commentThreadId: string;
  copyFrom: '';
  copyrightId: number;
  crbt: null;
  dayPlays: number;
  disc: string;
  duration: number;
  exclusive: boolean;
  fee: number;
  ftype: number;
  hMusic: {
    bitrate: number;
    dfsId: number;
    extension: string;
    id: number;
    name: null;
    playTime: number;
    size: number;
    sr: number;
    volumeDelta: number;
  };
  hearTime: number;
  lMusic: {
    bitrate: number;
    dfsId: number;
    extension: string;
    id: number;
    name: null;
    playTime: number;
    size: number;
    sr: number;
    volumeDelta: number;
  };
  mMusic: {
    bitrate: number;
    dfsId: number;
    extension: string;
    id: number;
    name: null;
    playTime: number;
    size: number;
    sr: number;
    volumeDelta: number;
  };
  mark: number;
  mp3Url: null;
  mvid: number;
  playedNum: number;
  popularity: number;
  position: number;
  privilege: {
    chargeInfoList: { chargeMessage: null; chargeType: number; chargeUrl: null; rate: number }[];
    cp: number;
    cs: boolean;
    dl: number;
    downloadMaxbr: number;
    fee: number;
    fl: number;
    flag: number;
    freeTrialPrivilege: { resConsumable: boolean; userConsumable: boolean };
    id: number;
    maxbr: number;
    payed: number;
    pl: number;
    playMaxbr: number;
    preSell: boolean;
    sp: number;
    st: number;
    subp: number;
    toast: boolean;
  };
  ringtone: string;
  rtUrl: null;
  rtUrls: [];
  rtype: number;
  rurl: null;
  score: number;
  sign: null;
  single: number;
  starred: boolean;
  starredNum: number;
  status: number;
  transName: string;
  transNames: string[];
}

interface IrGetSongURL extends IrURL {
  br: number;
  canExtend: boolean;
  encodeType: string;

  flag: number;
  freeTimeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
  };
  freeTrialInfo: null;
  freeTrialPrivilege: { resConsumable: boolean; userConsumable: boolean };
  gain: number;
  level: string;
  payed: number;
  type: string;
  uf: null;
  urlSource: number;
}

interface IrUserProfile {
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
  experts: null;
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
}

interface IrLoginEmail {
  account: {
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
  bindings: {
    bindingTime: number;
    expired: boolean;
    expiresIn: number;
    id: number;
    refreshTime: number;
    tokenJsonStr: string;
    type: number;
    url: string;
    userId: number;
  }[];
  cookie: string;
  loginType: number;
  profile: IrUserProfile;
  token: string;
}

interface IrBitRate {
  br: number;
  point: number;
  size: number;
}

interface IrCover {
  cover: string;
  coverId: number;
  coverId_str: string;
}
interface IrMVDetail
  extends IrMeta,
    IrCover,
    Pick<IrCount, 'commentCount' | 'playCount' | 'shareCount' | 'subCount'>,
    Pick<IrTime, 'publishTime'> {
  artistId: number;
  artistName: string;
  artists: IrArtistDetail[];
  briefDesc: string;
  brs: IrBitRate[];
  commentThreadId: string;
  desc: string;
  duration: number;
  nType: number;
  price: null;
  videoGroup: [];
}

interface IrRecMV
  extends IrMeta,
    Pick<IrCount, 'playCount'>,
    Pick<IrTime, 'trackNumberUpdateTime'> {
  alg: string;
  artistId: number;
  artistName: string;
  artists: IrArtistDetail[];
  canDislike: true;
  copywriter: string;
  duration: number;
  picUrl: string;
  subed: boolean;
  type: number;
}

interface IrSimilarMV extends IrMeta, Pick<IrCount, 'playCount'> {
  alg: string;
  artistId: number;
  artistName: string;
  artists: IrArtistDetail[];
  briefDesc: string;
  cover: string;
  desc: null;
  duration: number;
  mark: number;
}

interface IrArtistMV extends IrMeta, Pick<IrTime, 'publishTime'>, Pick<IrCount, 'playCount'> {
  artist: Pick<
    IrArtistDetail,
    | 'briefDesc'
    | 'id'
    | 'img1v1Id'
    | 'img1v1Id_str'
    | 'img1v1Url'
    | 'musicSize'
    | 'name'
    | 'picId'
    | 'picUrl'
    | 'topicPerson'
    | 'trans'
  >;
  artistName: string;
  duration: number;
  imgurl: string;
  imgurl16v9: string;
  status: number;
  subed: false;
}

interface IrGetMVUrl extends IrURL {
  r: number;
  st: number;
  promotionVo: null;
  mvFree: number;
  msg: string;
}
