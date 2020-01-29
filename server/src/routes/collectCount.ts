import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { CollectCount } from '../entities/CollectCount';
import logger from '../logger';

const router = express.Router();

router.post('', async (req, res) => {
  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager
      .getRepository(CollectCount)
      .createQueryBuilder('count');

    const { customer_id, always_yn } = req.body;

    var datas = [];

    if (customer_id === undefined) {
      datas = await repository
        .select('DISTINCT count.customer_id, always_yn')
        .orderBy('count.customer_id')
        .getRawMany();
    } else {
      datas = await repository
        .select('count(*) AS count, seq, channel, doc_datetime, keyword')
        .where({ customer_id: customer_id, always_yn: always_yn })
        .groupBy('channel, doc_datetime, keyword')
        .getRawMany();
    }

    return res.json({ data: datas });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;
