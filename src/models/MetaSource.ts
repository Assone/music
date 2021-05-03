import { usePhotoResize } from '@/utils';
import MMeta from './Meta';

export default class MMetaSource extends MMeta {
  cover: string;

  type: number;

  copywriter: string;

  constructor({ id, name, picUrl, type, copywriter }: IrMetaSource) {
    super({ id, name });

    this.cover = usePhotoResize(512, 512)(picUrl);
    this.type = type;
    this.copywriter = copywriter;
  }
}
