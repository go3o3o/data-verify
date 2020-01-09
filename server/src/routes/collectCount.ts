import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { CollectCount } from '../entities/CollectCount';
import logger from '../logger';

const router = express.Router();

router.get('/:mode', async (req, res) => {
  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager.getRepository(CollectCount);
    const mode = req.params.mode;

    logger.debug(`mode ${mode}`);

    var datas = [];

    if (mode === 'always') {
      datas = await repository.find({
        always_yn: 'Y',
      });
    } else if (mode === 'retroactive') {
      datas = await repository.find({
        always_yn: 'N',
      });
    }

    res.json(datas);
  } catch (e) {
    res.status(404).json({ message: e.message });
    throw new Error(e);
  }
});

export default router;
