import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import NodeService, { NodeDto } from '~services/NodeService';

@autobind
class NodeStore {
  @observable node: NodeDto[] = [];

  private nodeService = new NodeService();

  @action
  async nodeData(kind: string) {
    const nodeData = await this.nodeService.nodeData(kind);
    const customerIds = await this.nodeService.getCustomers();
    // console.log(response.data.data);
    // this.setNode(response.data.data);
    return { nodeData, customerIds };
  }

  @action
  async nodeDetailData(request_seq: number) {
    const nodeDetailData = await this.nodeService.nodeDetailData(request_seq);
    return nodeDetailData;
  }

  @action
  setNode(node: NodeDto[]) {
    this.node = node;
  }
}

export default NodeStore;
