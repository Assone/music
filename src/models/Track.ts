export default class MTrack {
  default: number;

  max: number;

  list: { rate: number; type: number }[];

  maxDetail: { download: number; play: number };

  id: number;

  constructor({ chargeInfoList, playMaxbr, downloadMaxbr, pl, maxbr, id }: IrTrack) {
    this.id = id;
    this.list = chargeInfoList?.map(({ rate, chargeType }) => ({ rate, type: chargeType }));
    this.maxDetail = {
      download: downloadMaxbr,
      play: playMaxbr,
    };
    this.default = pl;
    this.max = maxbr;
  }
}
