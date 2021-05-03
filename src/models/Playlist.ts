import { updatePlaylistName, updatePlaylistTags, updatePlaylistDesc } from '@/apis';
import { usePhotoResize } from '@/utils';
// import { formatTime } from '@/utils/format';

import MCount from './Count';
import MMetaSource from './MetaSource';
import MSong from './Song';
import MTime from './Time';
import MTrack from './Track';
import MUser from './User';

export default class MPlaylist extends MMetaSource {
  tags: string[];

  background: string | null;

  count: MCount;

  time: MTime;

  creator: MUser;

  trackIds: number[];

  songs?: MSong[];

  description: string;

  track?: MTrack[];

  constructor(data: IrPlaylistDetail) {
    super(data);

    const { tags, backgroundCoverUrl, creator, trackIds, description, coverImgUrl } = data;

    this.description = description;
    this.tags = tags;
    this.background = backgroundCoverUrl;
    this.cover = usePhotoResize(512, 512)(coverImgUrl);
    this.creator = new MUser(creator);
    this.count = new MCount(data);
    this.time = new MTime(data);
    this.trackIds = trackIds.map(({ id }) => id);
  }

  updateName(name: string): void {
    updatePlaylistName(this.id, name);
  }

  updateTags(tags: string[] | string): void {
    updatePlaylistTags(this.id, tags);
  }

  updateDesc(desc: string): void {
    updatePlaylistDesc(this.id, desc);
  }

  // get durationCount(): string {
  //   return formatTime(this.songs?.reduce((pre, cur) => pre + cur.duration, 0) || 0, 'HH小时mm分');
  // }
}
