import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { NodeRequest } from '../entities/NodeRequest';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeRequest);
    var node = [];
    if (kind === 'nodeStatus') {
      node = await repository.find({ seq: 10 });
    }
    if (kind === 'nodeMonitoring') {
      node = await repository.find({ seq: 5 });
    }

    return res.json({ data: node });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
