import { usePhotoResize } from '@/utils';
import MArtist from './Artist';
import MCount from './Count';
import MMeta from './Meta';

export default class MSimilarMV extends MMeta {
  cover: string;

  artists: MArtist[];

  artist: { id: number; name: string };

  duration: number;

  count: MCount;

  constructor({ id, name, artists, artistId, artistName, duration, cover, playCount }: IrSimilarMV) {
    super({ id, name });

    this.cover = usePhotoResize(512, 288)(cover);
    this.artists = artists.map((art) => new MArtist(art));
    this.artist = {
      id: artistId,
      name: artistName,
    };
    this.duration = duration;
    this.count = new MCount({ playCount });
  }
}
