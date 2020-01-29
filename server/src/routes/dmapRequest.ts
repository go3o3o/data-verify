import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { DmapRequest } from '../entities/DmapRequest';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  try {
    const manager = getConnectionManager().get('dmap');
    const repository = manager.getRepository(DmapRequest);
    var dmap = [];
    if (kind === 'dmapStatus') {
      dmap = await repository.find({ seq: 10 });
    }
    if (kind === 'dmapMonitoring') {
      dmap = await repository.find({ seq: 2 });
    }

    return res.json({ data: dmap });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
