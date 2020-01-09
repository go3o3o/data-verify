import NodeStore from './node/NodeStore';

export default class RootStore {
  static instance: RootStore;

  nodeStore = new NodeStore();
}
