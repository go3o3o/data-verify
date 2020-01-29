import NodeStore from './node/NodeStore';
import DmapStore from './dmap/DmapStore';
import VerifyStore from './verify/VerifyStore';

export default class RootStore {
  static instance: RootStore;

  nodeStore = new NodeStore();
  dmapStore = new DmapStore();
  verifyStore = new VerifyStore();
}
