import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { DmapProgress } from '../entities/DmapProgress';
import { DmapDocCheck } from '../entities/DmapDocCheck';
import { DmapProject } from '../entities/DmapProject';
import { DmapSource } from '../entities/DmapSource';
import { DmapCustomer } from '../entities/DmapCustomer';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  try {
    const manager = getConnectionManager().get('dmap');
    const repository = manager
      .getRepository(DmapProject)
      .createQueryBuilder('p');
    var dmap = [];

    if (kind === 'dmapStatus') {
      dmap = await repository
        .select(['p.seq, p.name, progress.customer_id, count(*) as cnt'])
        .addSelect(
          `CASE progress.state
           WHEN 0 THEN 'working'
           WHEN 1 THEN 'complete'
           WHEN 2 THEN 'working'
           WHEN 3 THEN 'error'
           WHEN 9 THEN 'error'
           END`,
          'status',
        )
        .innerJoin(DmapProgress, 'progress', 'p.seq = progress.project_seq')
        .groupBy('p.name, progress.state')
        .orderBy({ 'p.seq': 'DESC' })
        .getRawMany();
    }
    if (kind === 'dmapMonitoring') {
      dmap = await repository
        .orderBy({ seq: 'DESC', customer_id: 'ASC' })
        .getMany();
    }
    if (kind === 'getSource') {
      dmap = await repository
        .select([
          'DISTINCT source.seq, source.name, source.source_depth, source.depth1_seq, source.depth2_seq, source.depth3_seq',
        ])
        .from(DmapSource, 'source')
        .where('source.basic_yn = :basic_yn', { basic_yn: 'Y' })
        .getRawMany();
    }
    if (kind === 'getCustomers') {
      dmap = await repository
        .select(['DISTINCT customer.customer_id'])
        .from(DmapCustomer, 'customer')
        .where('customer.use_yn = :useYn', { useYn: 'Y' })
        .orderBy({ 'customer.customer_id': 'ASC' })
        .getRawMany();
    }

    return res.json({ data: dmap });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('/:kind/:project_seq', async (req, res) => {
  const kind = req.params.kind;
  const project_seq = req.params.project_seq;

  try {
    const manager = getConnectionManager().get('dmap');
    var dmap = [];
    if (kind === 'dmapStatus') {
      const repository = manager
        .getRepository(DmapDocCheck)
        .createQueryBuilder('d');

      dmap = await repository
        .select(['d.pub_day, count(*) as cnt'])
        .where({ project_seq })
        .groupBy('d.pub_day')
        .getRawMany();
    }
    if (kind === 'dmapProgress') {
      const repository = manager
        .getRepository(DmapProgress)
        .createQueryBuilder();

      dmap = await repository
        .where({ project_seq })
        .orderBy({ pub_day: 'DESC' })
        .getMany();
    }

    return res.json({ data: dmap });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
