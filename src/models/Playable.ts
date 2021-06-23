import store from '@/store';

interface IPlayableInfo {
  fee?: 1 | 4;
  noCopyrightRcmd?: null;
}

export default class MPlayable {
  playable: boolean;
  reason?: string;

  constructor(info: IPlayableInfo) {
    switch (info.fee) {
      case 1:
        if (store.getters.isAccountLogin && store.state.account?.vipType === 11) {
          this.playable = true;
        } else {
          this.playable = false;
          this.reason = 'need VIP';
        }
        break;
      case 4:
        this.playable = false;
        this.reason = '付费专辑';
        break;
      default:
        if (info.noCopyrightRcmd) {
          this.playable = false;
          this.reason = '无版权';
        }

        this.playable = true;
    }
  }
}
