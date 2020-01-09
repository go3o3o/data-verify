import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { NodeRequest } from '../entities/NodeRequest';

const router = express.Router();

router.get('/status', async (req, res) => {
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeRequest);
    const datas = await repository.find();

    res.json(datas);
  } catch (e) {
    res.status(404).json({ message: e.message });
    throw new Error(e);
  }
});

router.get('/monitoring', async (req, res) => {
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeRequest);
    const datas = await repository.find({ seq: 2 });

    res.json(datas);
  } catch (e) {
    res.status(404).json({ message: e.message });
    throw new Error(e);
  }
});

export default router;
