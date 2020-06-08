import * as express from 'express';

import { getConnectionManager } from 'typeorm';
import * as moment from 'moment';

import { NodeRequest } from '../entities/NodeRequest';
import { NodeChannel } from '../entities/NodeChannel';
import { NodeCustomer } from '../entities/NodeCustomer';
import { NodeProgress } from '../entities/NodeProgress';
import { NodeRule } from '../entities/NodeRule';
import logger from '../lib/logger';

const router = express.Router();

router.post('/:kind', async (req, res) => {
  const kind = req.params.kind;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: POST /node/${kind}`);
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
           WHEN 'linkFinished' THEN 'request'
           WHEN 'DocFinished' THEN 'finished' 
           WHEN 'linkDocFinished' THEN 'finished' 
           WHEN 'apiFinished' THEN 'finished'
           WHEN 'linkRequest' THEN 'request'
           WHEN 'docRequest' THEN 'request'
           WHEN 'apiRequest' THEN 'request' 
           WHEN 'linkDocRequest' THEN 'request'
           WHEN 'linkCollecting' THEN 'request'
           WHEN 'docCollecting'  THEN 'request'
           WHEN 'linkDocCollecting' THEN 'request'  
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
    return res.status(500).json({ msg: e.message });
  }
});

router.post('/:kind/:request_seq', async (req, res) => {
  const kind = req.params.kind;
  const request_seq = req.params.request_seq;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: POST /node/${kind}/${request_seq}`);
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

router.delete('/:request_seq', async (req, res) => {
  const request_seq = req.params.request_seq;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: DELETE REQUEST /node/${request_seq}`);
  logger.info(
    ` ### ${addr}: DELETE FROM dmap_collector.tb_crawl_request WHERE seq = ${request_seq}`,
  );
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeRequest).createQueryBuilder();

    await repository
      .delete()
      .where('seq = :seq', { seq: request_seq })
      .execute();

    return res.json({ msg: 'OK' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.delete('/:progress_seq', async (req, res) => {
  const progress_seq = req.params.progress_seq;
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${addr}: DELETE PROGRESS /node/${progress_seq}`);
  logger.info(
    ` ### ${addr}: DELETE FROM dmap_collector.tb_crawl_progress WHERE seq = ${progress_seq}`,
  );
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeProgress).createQueryBuilder();

    await repository
      .delete()
      .where('seq = :seq', { seq: progress_seq })
      .execute();

    return res.json({ msg: 'OK' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.patch('', async (req, res) => {
  const request = req.body;
  // console.log(request);
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(
    ` ### ${addr}: dmap_collector.tb_crawl_request 수정 ${JSON.stringify(
      request,
    )}`,
  );
  try {
    const manager = getConnectionManager().get('node');
    const repository = manager.getRepository(NodeRequest).createQueryBuilder();

    await repository
      .update(NodeRequest)
      .set({
        keyword: request.keyword,
        start_dt: request.start_dt,
        end_dt: request.end_dt,
        status: request.status,
      })
      .where('seq = :seq', { seq: request.seq })
      .execute();

    return res.json({ msg: 'OK' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
