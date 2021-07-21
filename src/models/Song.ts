import { usePhotoResize } from '@/utils';
import Mixins from '@/utils/Mixins';
import MMeta from './Meta';
import MPlayable from './Playable';

export default class MSong extends Mixins(MMeta, MPlayable) implements MMeta, MPlayable {
  artists: { id: number; name: string }[];

  mvId: number;

  album: { id: number; name: string; cover: string };

  duration: number;

  id!: number;

  name!: string;

  playable!: boolean;

  reason?: string;

  alia?: string;

  constructor({
    id,
    name,
    alia,
    al: { id: alId, name: alName, picUrl: alCover },
    ar,
    mv,
    dt,
    fee,
    noCopyrightRcmd,
  }: IrSongDetail) {
    super({ id, name, fee, noCopyrightRcmd });

    [this.alia] = alia;
    this.album = {
      id: alId,
      name: alName,
      cover: usePhotoResize(244, 244)(alCover),
    };
    this.artists = ar.map(({ id: artId, name: artName }) => ({
      id: artId,
      name: artName,
    }));
    this.mvId = mv;
    this.duration = dt;
  }
}
