import MArtist from './Artist';
import MCount from './Count';
import MMetaSource from './MetaSource';

export default class MRecMV extends MMetaSource {
  artists: MArtist[];

  artist: { id: number; name: string };

  duration: number;

  count: MCount;

  constructor({ id, name, artists, artistId, artistName, picUrl, type, duration, copywriter, playCount }: IrRecMV) {
    super({ id, name, picUrl, type, copywriter });

    this.artists = artists.map((art) => new MArtist(art));
    this.artist = {
      id: artistId,
      name: artistName,
    };
    this.duration = duration;
    this.count = new MCount({ playCount });
  }
}
