import { usePhotoResize } from '@/utils';
import MArtist from './Artist';
import MMeta from './Meta';

export default class MArtistMV extends MMeta {
  artist: MArtist;

  cover: string;

  duration: number;

  status: number;

  constructor({ id, name, artist, imgurl, imgurl16v9, duration, status }: IrArtistMV) {
    super({ id, name });

    this.artist = new MArtist(artist as IrArtistDetail);
    this.cover = usePhotoResize(512, 288)(imgurl || imgurl16v9);
    this.duration = duration;
    this.status = status;
  }
}
