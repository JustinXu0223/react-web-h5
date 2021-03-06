/**
 * @component demo.js
 * @description demo store
 * @time 2018/10/22
 * @author JUSTIN XU
 */
// import { action, reaction, observable, observe, computed, autorun, runInAction } from 'mobx';
import { action, reaction, observable } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class DemoStore {
  @observable counter = 0;
  @observable total = 0;

  constructor() {
    reaction(() => this.counter, this.increaseTotal);
  }

  // async action, must use runInAction after fetch
  // @action async getRedPacketListReq() {
  //   try {
  //     const {
  //       totalCount = null,
  //       result = [],
  //     } = await HomeService.getRedPacketList();
  //     runInAction(() => {
  //       this.redPackTotal = totalCount;
  //       this.redPackList = [...result];
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  @action increaseTotal = async () => {
    this.total++;
  }

  @action increase() {
    this.counter++;
  }

  @action decrease() {
    this.counter--;
  }
}

export default DemoStore;
