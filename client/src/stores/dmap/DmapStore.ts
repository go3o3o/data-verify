import { action, observable, reaction } from 'mobx';
import autobind from 'autobind-decorator';
import DmapService, { ProjectDto, CrawlQueueDto } from '~services/DmapService';

@autobind
class DmapStore {
  @observable dmap: ProjectDto[] = [];

  private dmapService = new DmapService();

  @action
  async dmapData(kind: string) {
    const dmapData = await this.dmapService.dmapData(kind);
    const source = await this.dmapService.getSource();
    const customers = await this.dmapService.getCustomers();
    // this.setDmap(response.data.data);
    return { dmapData, source, customers };
  }

  @action
  async dmapDetailData(project_seq: number) {
    const dmapDetailData = await this.dmapService.dmapDetailData(project_seq);
    return dmapDetailData;
  }

  @action
  async docCheckData(project_seq: number) {
    const docCheckData = await this.dmapService.docCheckData(project_seq);
    return docCheckData;
  }

  @action
  async crawlQueueData() {
    const crawlQueueData = await this.dmapService.crawlQueueData();
    const source = await this.dmapService.getSource();
    return { crawlQueueData, source };
  }

  @action
  async deleteCrawlQueue(queue_seq: number) {
    await this.dmapService.deleteCrawlQueue(queue_seq);
  }

  @action
  async updateCrawlQueue(queue: CrawlQueueDto) {
    await this.dmapService.updateCrawlQueue(queue);
  }

  @action
  setDmap(dmap: ProjectDto[]) {
    this.dmap = dmap;
  }
}

export default DmapStore;
