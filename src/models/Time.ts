export default class MTime {
  create: number | undefined;

  update: number | undefined;

  updateTrack: number | undefined;

  updateTrackNumber: number | undefined;

  publish: number | undefined;

  constructor({
    trackNumberUpdateTime,
    trackUpdateTime,
    createTime,
    updateTime,
    publishTime,
  }: IrTime) {
    this.create = createTime;
    this.update = updateTime;
    this.updateTrack = trackUpdateTime;
    this.updateTrackNumber = trackNumberUpdateTime;
    this.publish = publishTime;
  }
}
