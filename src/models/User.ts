export default class MUser {
  name: string;

  id: number;

  gender: number;

  description: string;

  avatar: string;

  birthday: number;

  city: number;

  province: number;

  constructor({
    avatarUrl,
    birthday,
    city,
    province,
    description,
    gender,
    nickname,
    userId,
  }: IrUser) {
    this.name = nickname;
    this.id = userId;
    this.gender = gender;
    this.description = description;
    this.avatar = avatarUrl;
    this.birthday = birthday;
    this.city = city;
    this.province = province;
  }
}
