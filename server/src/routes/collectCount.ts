import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { CollectCount } from '../entities/CollectCount';
import logger from '../lib/logger';

const router = express.Router();

router.post('', async (req, res) => {
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: POST /count/`);
  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager
      .getRepository(CollectCount)
      .createQueryBuilder('count');

    var countData = [];
    countData = await repository
      .select('DISTINCT count.customer_id, always_yn')
      .orderBy('count.customer_id')
      .getRawMany();

    return res.json({ data: countData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/:customer_id/:always_yn', async (req, res) => {
  const customer_id = req.params.customer_id;
  const always_yn = req.params.always_yn;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: POST /count/${customer_id}/${always_yn}`);

  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager.getRepository(CollectCount).createQueryBuilder();

    var countByCustomerId = [];
    countByCustomerId = await repository
      .select(
        'count(*) AS count, seq, channel, doc_datetime, collect_type, keyword',
      )
      .where({ customer_id: customer_id, always_yn: always_yn })
      .groupBy('channel, doc_datetime, keyword')
      .getRawMany();

    return res.json({ data: countByCustomerId });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
export default router;
