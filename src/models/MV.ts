import { usePhotoResize } from '@/utils';
import MArtist from './Artist';
import MCount from './Count';
import MMeta from './Meta';

export default class MMV extends MMeta {
  cover: string;

  artists: MArtist[];

  count: MCount;

  duration: number;

  time: number | undefined;

  artist: { id: number; name: string };

  constructor({
    id,
    name,
    cover,
    duration,
    artistId,
    artistName,
    artists,
    commentCount,
    subCount,
    shareCount,
    playCount,
    publishTime,
  }: IrMVDetail) {
    super({ id, name });

    this.cover = usePhotoResize(512, 288)(cover);
    this.artist = {
      id: artistId,
      name: artistName,
    };
    this.artists = artists.map((art) => new MArtist(art));
    this.count = new MCount({ commentCount, subCount, shareCount, playCount });
    this.duration = duration;
    this.time = publishTime;
  }
}
