import { usePhotoResize } from '@/utils';
import MMeta from './Meta';

export default class MArtist extends MMeta {
  avatar: string | undefined;

  size: { music: number; album: number; mv: number };

  description: string;

  followed: boolean;

  constructor({
    id,
    name,
    picUrl,
    albumSize,
    musicSize,
    cover,
    mvSize,
    briefDesc,
    followed,
  }: IrArtistDetail) {
    super({ id, name });

    this.followed = followed;
    this.description = briefDesc;
    this.avatar = usePhotoResize(512, 512)(picUrl || cover);
    this.size = {
      music: musicSize,
      album: albumSize,
      mv: mvSize,
    };
  }
}
