import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { DmapProgress } from '../entities/DmapProgress';
import { DmapDocCheck } from '../entities/DmapDocCheck';
import { DmapProject } from '../entities/DmapProject';
import { DmapSource } from '../entities/DmapSource';
import { DmapCustomer } from '../entities/DmapCustomer';
import { DmapProjectKeyword } from '../entities/DmapProjectKeyword';
import { DmapCrawlQueue } from '../entities/DmapCrawlQueue';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  // console.log(kind);
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
    if (kind === 'dmapQueue') {
      dmap = await repository
        .select([
          'queue.seq, p.name, queue.depth1_seq, queue.depth2_seq, queue.depth3_seq, queue.start_dt, queue.end_dt',
        ])
        .innerJoin(DmapCrawlQueue, 'queue', 'queue.project_seq = p.seq')
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
        .select(['pk.keyword, d.pub_day, count(*) as cnt'])
        .innerJoin(DmapProjectKeyword, 'pk', 'pk.seq=d.keyword_seq')
        .where('d.project_seq = :project_seq', { project_seq: project_seq })
        .groupBy('d.pub_day, d.keyword_seq')
        .getRawMany();

      // dmap = await repository
      //   .select(['d.pub_day, count(*) as cnt'])
      //   .where({ project_seq })
      //   .groupBy('d.pub_day')
      //   .getRawMany();
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

router.delete('/:queue_seq', async (req, res) => {
  const seq = req.params.queue_seq;
  try {
    const manager = getConnectionManager().get('dmap');
    const repository = manager
      .getRepository(DmapCrawlQueue)
      .createQueryBuilder();

    await repository
      .delete()
      .where('seq = :seq', { seq: seq })
      .execute();

    return res.json({ msg: 'OK' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.put('', async (req, res) => {
  const queue = req.body;
  try {
    const manager = getConnectionManager().get('dmap');
    const repository = manager
      .getRepository(DmapCrawlQueue)
      .createQueryBuilder();

    await repository
      .update()
      .set({ start_dt: queue.start_dt, end_dt: queue.end_dt })
      .where('seq = :seq', { seq: queue.seq })
      .execute();
    return res.json({ msg: 'OK' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
