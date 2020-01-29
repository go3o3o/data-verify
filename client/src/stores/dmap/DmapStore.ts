import { action, observable, reaction } from 'mobx';
import autobind from 'autobind-decorator';
import DmapService, { DmapDto } from '~services/DmapService';

@autobind
class DmapStore {
  @observable dmap: DmapDto[] = [];

  private dmapService = new DmapService();

  @action
  async dmapData(kind: string) {
    const response = await this.dmapService.dmapData(kind);
    console.log(response.data.data);
    this.setDmap(response.data.data);
  }

  @action
  setDmap(dmap: DmapDto[]) {
    this.dmap = dmap;
  }
}

export default DmapStore;
