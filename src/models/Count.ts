export default class MCount {
  comment: number | undefined;

  cloudTrack: number | undefined;

  play: number | undefined;

  share: number | undefined;

  track: number | undefined;

  subscribed: number | undefined;

  constructor({ commentCount, cloudTrackCount, playCount, shareCount, trackCount, subscribedCount }: IrCount) {
    this.comment = commentCount;
    this.cloudTrack = cloudTrackCount;
    this.play = playCount;
    this.share = shareCount;
    this.track = trackCount;
    this.subscribed = subscribedCount;
  }
}
