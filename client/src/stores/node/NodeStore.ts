import { action, observable, reaction } from 'mobx';
import autobind from 'autobind-decorator';
import NodeService, { NodeDto } from '~services/NodeService';

@autobind
class NodeStore {
  @observable node: NodeDto[] = [];

  private nodeService = new NodeService();

  @action
  async status() {
    const response = await this.nodeService.status();
    this.setNode(response.data.data);
  }

  @action
  async monitoring() {
    const response = await this.nodeService.monitoring();
    this.setNode(response.data.data);
  }

  @action
  setNode(node: NodeDto[]) {
    this.node = node;
  }
}

export default NodeStore;
