import MCount from './Count';
import MMetaSource from './MetaSource';

export default class MRecPlaylist extends MMetaSource {
  count: MCount;

  constructor(data: GetRecPlaylistResponse) {
    super(data);

    this.count = new MCount(data);
  }
}
