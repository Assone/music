export default class MURLSong {
  id: number;

  type: string;

  url: string;

  constructor({ id, type, url }: IrGetSongURL) {
    this.id = id;
    this.type = type;
    this.url = url;
  }
}
