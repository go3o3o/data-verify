import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import { CollectData } from '../entities/CollectData';
import logger from '../lib/logger';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.debug(`${addr}: POST /data/${kind}`);

  var always_yn = '';
  if (kind === 'always') {
    always_yn = 'Y';
  } else if (kind === 'retroactive') {
    always_yn = 'N';
  }

  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager
      .getRepository(CollectData)
      .createQueryBuilder('d');

    var datas = [];

    datas = await repository
      .where('always_yn = :always_yn', { always_yn })
      .groupBy('customer_id, channel')
      .orderBy({ customer_id: 'ASC' })
      .getMany();

    return res.json({ data: datas });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/:kind/getCustomers', async (req, res) => {
  const kind = req.params.kind;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.debug(`${addr}: POST /data/${kind}/getCustomers`);

  var always_yn = '';
  if (kind === 'always') {
    always_yn = 'Y';
  } else if (kind === 'retroactive') {
    always_yn = 'N';
  }

  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager
      .getRepository(CollectData)
      .createQueryBuilder('d');

    var datas = [];
    datas = await repository
      .select(['DISTINCT d.customer_id'])
      .where('always_yn = :always_yn', { always_yn })
      .orderBy({ customer_id: 'ASC' })
      .getRawMany();

    return res.json({ data: datas });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/:kind/:customer_id/:channel', async (req, res) => {
  const kind = req.params.kind;
  const customer_id = req.params.customer_id;
  const channel = req.params.channel;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.debug(`${addr}: POST /data/${kind}/${customer_id}/${channel}`);

  var always_yn = '';
  if (kind === 'always') {
    always_yn = 'Y';
  } else if (kind === 'retroactive') {
    always_yn = 'N';
  }

  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager.getRepository(CollectData);

    var datas = [];

    datas = await repository.find({
      where: {
        always_yn: always_yn,
        customer_id: customer_id,
        channel: channel,
      },
      order: {
        doc_datetime: 'DESC',
      },
    });

    return res.json({ data: datas });
  } catch (e) {
    res.status(404).json({ message: e.message });
    return res.status(500).json({ message: e.message });
  }
});

export default router;
