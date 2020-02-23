"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const CollectData_1 = require("../entities/CollectData");
const router = express.Router();
router.post('/:kind', async (req, res) => {
    const kind = req.params.kind;
    var always_yn = '';
    if (kind === 'always') {
        always_yn = 'Y';
    }
    else if (kind === 'retroactive') {
        always_yn = 'N';
    }
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager
            .getRepository(CollectData_1.CollectData)
            .createQueryBuilder('d');
        var datas = [];
        datas = await repository
            .where('always_yn = :always_yn', { always_yn })
            .groupBy('channel')
            .orderBy({ customer_id: 'ASC' })
            .getMany();
        return res.json({ data: datas });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
router.post('/:kind/getCustomers', async (req, res) => {
    const kind = req.params.kind;
    var always_yn = '';
    if (kind === 'always') {
        always_yn = 'Y';
    }
    else if (kind === 'retroactive') {
        always_yn = 'N';
    }
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager
            .getRepository(CollectData_1.CollectData)
            .createQueryBuilder('d');
        var datas = [];
        datas = await repository
            .select(['DISTINCT d.customer_id'])
            .where('always_yn = :always_yn', { always_yn })
            .orderBy({ customer_id: 'ASC' })
            .getRawMany();
        return res.json({ data: datas });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
router.post('/:kind/:customer_id/:channel', async (req, res) => {
    const kind = req.params.kind;
    var always_yn = '';
    if (kind === 'always') {
        always_yn = 'Y';
    }
    else if (kind === 'retroactive') {
        always_yn = 'N';
    }
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectData_1.CollectData);
        const customer_id = req.params.customer_id;
        const channel = req.params.channel;
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
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        return res.status(500).json({ message: e.message });
    }
});
exports.default = router;
