import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { NodeRequest } from '../entities/NodeRequest';
import { NodeChannel } from '../entities/NodeChannel';
import { NodeCustomer } from '../entities/NodeCustomer';
import { NodeProgress } from '../entities/NodeProgress';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager
      .getRepository(NodeRequest)
      .createQueryBuilder('r');

    var node = [];
    if (kind === 'nodeStatus') {
      // node = await repository.orderBy({ seq: 'DESC' });
      var subQuery = await repository
        .select([
          'r.customer_seq AS customer_seq, customer.name AS name, COUNT(*) AS cnt',
        ])
        .addSelect(
          `CASE progress.status
           WHEN 'linkFinished' THEN 'working'
           WHEN 'DocFinished' THEN 'complete' 
           WHEN 'linkDocFinished' THEN 'complete' 
           WHEN 'apiFinished' THEN 'complete'
           WHEN 'linkRequest' THEN 'working'
           WHEN 'docRequest' THEN 'working'
           WHEN 'apiRequest' THEN 'working' 
           WHEN 'linkDocRequest' THEN 'working'
           WHEN 'linkCollecting' THEN 'working'
           WHEN 'docCollecting'  THEN 'working'
           WHEN 'linkDocCollecting' THEN 'working'  
           WHEN 'linkCollectError' THEN 'error' 
           WHEN 'docCollectError' THEN 'error'
           WHEN 'linkDocCollectError' THEN 'error'
           WHEN 'apiCollectError' THEN 'error'
           END`,
          'status',
        )
        .from(NodeCustomer, 'customer')
        .from(NodeProgress, 'progress')
        .where("r.status IN ('CRS001', 'CRS002', 'CRS005')")
        .andWhere('r.customer_seq = customer.seq')
        .andWhere('r.seq = progress.request_seq')
        .groupBy('r.customer_seq, progress.status');

      node = await manager
        .createQueryBuilder()
        .select(
          'subQuery.customer_seq, subQuery.name, subQuery.status, SUM(subQuery.cnt) AS cnt',
        )
        .from('(' + subQuery.getQuery() + ')', 'subQuery')
        .groupBy('subQuery.customer_seq, subQuery.name, subQuery.status')
        .orderBy('subQuery.customer_seq')
        .getRawMany();
    }

    if (kind === 'nodeMonitoring') {
      node = await repository
        .select(['r.*, channel.name AS channel, customer.name AS customer_id'])
        .innerJoin(NodeChannel, 'channel', 'channel.seq = r.channel_seq')
        .innerJoin(NodeCustomer, 'customer', 'customer.seq = r.customer_seq')
        .where('customer.use_yn = :useYn', { useYn: 'Y' })
        .orderBy({ 'r.seq': 'DESC' })
        .getRawMany();
    }
    if (kind === 'getCustomers') {
      node = await repository
        .select(['DISTINCT customer.name'])
        .innerJoin(NodeCustomer, 'customer')
        .where('customer.use_yn = :useYn', { useYn: 'Y' })
        .orderBy({ 'customer.name': 'ASC' })
        .getRawMany();
    }

    return res.json({ data: node });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e.message });
  }
});

router.post('/:kind/:request_seq', async (req, res) => {
  const kind = req.params.kind;
  const request_seq = req.params.request_seq;
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeProgress).createQueryBuilder();

    var detailNode = [];

    detailNode = await repository
      .where({ request_seq })
      .orderBy({ progress_dt: 'DESC' })
      .getMany();

    return res.json({ data: detailNode });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
