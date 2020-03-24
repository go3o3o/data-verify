"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const DmapProgress_1 = require("../entities/DmapProgress");
const DmapDocCheck_1 = require("../entities/DmapDocCheck");
const DmapProject_1 = require("../entities/DmapProject");
const DmapSource_1 = require("../entities/DmapSource");
const DmapCustomer_1 = require("../entities/DmapCustomer");
const DmapProjectKeyword_1 = require("../entities/DmapProjectKeyword");
const DmapCrawlQueue_1 = require("../entities/DmapCrawlQueue");
const router = express.Router();
router.post('/:kind', async (req, res) => {
    const kind = req.params.kind;
    try {
        const manager = typeorm_1.getConnectionManager().get('dmap');
        const repository = manager
            .getRepository(DmapProject_1.DmapProject)
            .createQueryBuilder('p');
        var dmap = [];
        if (kind === 'dmapStatus') {
            dmap = await repository
                .select(['p.seq, p.name, progress.customer_id, count(*) as cnt'])
                .addSelect(`CASE progress.state
           WHEN 0 THEN 'working'
           WHEN 1 THEN 'complete'
           WHEN 2 THEN 'working'
           WHEN 3 THEN 'error'
           WHEN 9 THEN 'error'
           END`, 'status')
                .innerJoin(DmapProgress_1.DmapProgress, 'progress', 'p.seq = progress.project_seq')
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
                .from(DmapSource_1.DmapSource, 'source')
                .where('source.basic_yn = :basic_yn', { basic_yn: 'Y' })
                .getRawMany();
        }
        if (kind === 'getCustomers') {
            dmap = await repository
                .select(['DISTINCT customer.customer_id'])
                .from(DmapCustomer_1.DmapCustomer, 'customer')
                .where('customer.use_yn = :useYn', { useYn: 'Y' })
                .orderBy({ 'customer.customer_id': 'ASC' })
                .getRawMany();
        }
        if (kind === 'dmapQueue') {
            dmap = await repository
                .select([
                'queue.seq, p.name, queue.depth1_seq, queue.depth2_seq, queue.depth3_seq, queue.start_dt, queue.end_dt',
            ])
                .innerJoin(DmapCrawlQueue_1.DmapCrawlQueue, 'queue', 'queue.project_seq = p.seq')
                .getRawMany();
        }
        return res.json({ data: dmap });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
});
router.post('/:kind/:project_seq', async (req, res) => {
    const kind = req.params.kind;
    const project_seq = req.params.project_seq;
    try {
        const manager = typeorm_1.getConnectionManager().get('dmap');
        var dmap = [];
        if (kind === 'dmapStatus') {
            const repository = manager
                .getRepository(DmapDocCheck_1.DmapDocCheck)
                .createQueryBuilder('d');
            dmap = await repository
                .select(['pk.keyword, d.pub_day, count(*) as cnt'])
                .innerJoin(DmapProjectKeyword_1.DmapProjectKeyword, 'pk', 'pk.seq=d.keyword_seq')
                .where('d.project_seq = :project_seq', { project_seq: project_seq })
                .groupBy('d.pub_day, d.keyword_seq')
                .getRawMany();
        }
        if (kind === 'dmapProgress') {
            const repository = manager
                .getRepository(DmapProgress_1.DmapProgress)
                .createQueryBuilder();
            dmap = await repository
                .where({ project_seq })
                .orderBy({ pub_day: 'DESC' })
                .getMany();
        }
        return res.json({ data: dmap });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
});
router.delete('/:queue_seq', async (req, res) => {
    const seq = req.params.queue_seq;
    try {
        const manager = typeorm_1.getConnectionManager().get('dmap');
        const repository = manager
            .getRepository(DmapCrawlQueue_1.DmapCrawlQueue)
            .createQueryBuilder();
        await repository
            .delete()
            .where('seq = :seq', { seq: seq })
            .execute();
        return res.json({ msg: 'OK' });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
});
router.put('', async (req, res) => {
    const queue = req.body;
});
exports.default = router;
