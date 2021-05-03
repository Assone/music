import { usePhotoResize } from '@/utils';
import MMeta from './Meta';

export default class MSong extends MMeta {
  artists: { id: number; name: string }[];

  mvId: number;

  album: { id: number; name: string; cover: string };

  duration: number;

  constructor({
    id,
    name,
    al: { id: alId, name: alName, picUrl: alCover },
    ar,
    mv,
    dt,
  }: IrSongDetail) {
    super({ id, name });

    this.album = {
      id: alId,
      name: alName,
      cover: usePhotoResize(244, 244)(alCover),
    };
    this.artists = ar.map(({ id: artId, name: artName }) => ({ id: artId, name: artName }));
    this.mvId = mv;
    this.duration = dt;
  }
}
