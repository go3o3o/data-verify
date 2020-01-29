import * as express from 'express';

import { getConnectionManager, IsNull } from 'typeorm';
import { CollectData } from '../entities/CollectData';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;

  try {
    const manager = getConnectionManager().get('verify');
    const repository = manager.getRepository(CollectData).createQueryBuilder();

    const { customer_id, channel } = req.body;

    var datas = [];
    if (kind === 'always') {
      if (customer_id === undefined && channel === undefined) {
        datas = await repository
          .where({ always_yn: 'Y' })
          .groupBy('channel')
          .orderBy({ customer_id: 'ASC' })
          .getMany();
      } else {
        datas = await repository
          .where({
            always_yn: 'Y',
            customer_id: customer_id,
            channel: channel,
          })
          .orderBy({ doc_datetime: 'DESC' })
          .getMany();
      }
    } else if (kind === 'retroactive') {
      datas = await repository
        .where({ always_yn: 'N' })
        .groupBy('channel')
        .orderBy({ customer_id: 'ASC' })
        .getMany();
    }
    return res.json({ data: datas });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post(
  '/:kind/:customer_id/:collect_type/:doc_datetime',
  async (req, res) => {
    const kind = req.params.kind;

    try {
      const manager = getConnectionManager().get('verify');
      const repository = manager.getRepository(CollectData);

      const customer_id = req.params.customer_id;
      const collect_type = req.params.collect_type;
      const doc_datetime = req.params.doc_datetime;

      var datas = [];
      if (kind === 'always') {
        datas = await repository.find({
          always_yn: 'Y',
          ...(customer_id !== "''" && { customer_id }),
          ...(collect_type !== "''" && { collect_type }),
          ...(doc_datetime !== "''" && { doc_datetime }),
        });
      } else if (kind === 'retroactive') {
        datas = await repository.find({
          always_yn: 'N',
          ...(customer_id !== "''" && { customer_id }),
          ...(collect_type !== "''" && { collect_type }),
          ...(doc_datetime !== "''" && { doc_datetime }),
        });
      }

      return res.json({ data: datas });
    } catch (e) {
      res.status(404).json({ message: e.message });
      return res.status(500).json({ message: e.message });
    }
  },
);

export default router;
