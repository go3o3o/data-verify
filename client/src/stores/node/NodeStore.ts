import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import NodeService, { NodeDto } from '~services/NodeService';

@autobind
class NodeStore {
  @observable node: NodeDto[] = [];

  private nodeService = new NodeService();

  @action
  async nodeData(kind: string) {
    const response = await this.nodeService.nodeData(kind);
    // console.log(response.data.data);
    this.setNode(response.data.data);
  }

  @action
  setNode(node: NodeDto[]) {
    this.node = node;
  }
}

export default NodeStore;
