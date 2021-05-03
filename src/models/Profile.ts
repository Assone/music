export default class MProfile {
  id: number;

  name: string;

  avatar: string;

  background: string;

  birthday: number;

  city: number;

  gender: number;

  province: number;

  description: string;

  signature: string;

  count: { event: number; playlist: number; playlistBeSubscribed: number };

  status: { account: number; auth: number; dj: number };

  constructor({
    accountStatus,
    authStatus,
    djStatus,
    avatarUrl,
    backgroundUrl,
    birthday,
    city,
    gender,
    province,
    description,
    eventCount,
    playlistCount,
    playlistBeSubscribedCount,
    signature,
    nickname,
    userId,
  }: IrUserProfile) {
    this.id = userId;
    this.name = nickname;
    this.avatar = avatarUrl;
    this.background = backgroundUrl;
    this.birthday = birthday;
    this.city = city;
    this.gender = gender;
    this.province = province;
    this.description = description;
    this.signature = signature;

    this.count = {
      event: eventCount,
      playlist: playlistCount,
      playlistBeSubscribed: playlistBeSubscribedCount,
    };
    this.status = {
      account: accountStatus,
      auth: authStatus,
      dj: djStatus,
    };
  }
}
