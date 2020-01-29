"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const CollectCount_1 = require("../entities/CollectCount");
const router = express.Router();
router.post('', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager
            .getRepository(CollectCount_1.CollectCount)
            .createQueryBuilder('count');
        const { customer_id } = req.body;
        var datas = [];
        if (customer_id === undefined) {
            datas = await repository
                .select('DISTINCT count.customer_id, always_yn')
                .orderBy('count.customer_id')
                .getRawMany();
        }
        else {
            datas = await repository
                .select('count(*) AS count, channel, doc_datetime, keyword')
                .where({ customer_id: customer_id })
                .groupBy('channel, doc_datetime, keyword')
                .getRawMany();
        }
        return res.json({ data: datas });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
router.post('/:customer_id', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager
            .getRepository(CollectCount_1.CollectCount)
            .createQueryBuilder('count');
        const customer_id = req.params.customer_id;
        var datas = [];
        return res.json({ data: datas });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
exports.default = router;
