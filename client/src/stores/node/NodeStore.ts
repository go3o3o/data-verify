import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import NodeService, {
  RequestDto,
  UpdateRequestDto,
} from '~services/NodeService';

@autobind
class NodeStore {
  @observable node: RequestDto[] = [];

  private nodeService = new NodeService();

  @action
  async nodeData(kind: string) {
    const nodeData = await this.nodeService.nodeData(kind);
    const customers = await this.nodeService.getCustomers();
    return { nodeData, customers };
  }

  @action
  async nodeDetailData(request_seq: number) {
    const nodeDetailData = await this.nodeService.nodeDetailData(request_seq);
    return nodeDetailData;
  }

  @action
  async deleteRequest(request_seq: number) {
    await this.nodeService.deleteRequest(request_seq);
  }

  @action
  async deleteProgress(progress_seq: number) {
    await this.nodeService.deleteRequest(progress_seq);
  }

  @action
  async updateRequest(body: UpdateRequestDto) {
    await this.nodeService.updateRequest(body);
  }

  @action
  setNode(node: RequestDto[]) {
    this.node = node;
  }
}

export default NodeStore;
