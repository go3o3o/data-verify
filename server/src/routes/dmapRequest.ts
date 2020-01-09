import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { DmapRequest } from '../entities/DmapRequest';

const router = express.Router();

router.get('', async (req, res) => {
  try {
    const manager = getConnectionManager().get('dmap');
    const repository = manager.getRepository(DmapRequest);
    const datas = await repository.find();

    res.json(datas);
  } catch (e) {
    res.status(404).json({ message: e.message });
    throw new Error(e);
  }
});

export default router;
