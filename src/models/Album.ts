import { usePhotoResize } from '@/utils';
import MArtist from './Artist';
import MMeta from './Meta';
import MTime from './Time';

export default class MAlbum extends MMeta {
  company: string;

  cover: string;

  time: MTime;

  description: string;

  artist: MArtist;

  type: string;

  size: number;

  artists: MArtist[];

  constructor({
    id,
    name,
    company,
    picUrl,
    publishTime,
    description,
    artist,
    artists,
    type,
    size,
  }: IrAlbumDetail) {
    super({ id, name });

    this.company = company;
    this.cover = usePhotoResize(512, 512)(picUrl);
    this.description = description || '';
    this.time = new MTime({ publishTime });
    this.artist = new MArtist(artist);
    this.artists = artists.map((art) => new MArtist(art));
    this.type = type;
    this.size = size;
  }
}
