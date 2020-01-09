"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const CollectData_1 = require("../entities/CollectData");
const router = express.Router();
router.get('/always', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectData_1.CollectData);
        const datas = await repository.find({
            always_yn: 'Y',
        });
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
router.get('/always/:customerId/:collect_type/:doc_datetime', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectData_1.CollectData);
        const params = {
            customerId: req.params.customerId,
            collect_type: req.params.collect_type,
            doc_datetime: req.params.doc_datetime,
        };
        const datas = await repository.find({
            always_yn: 'Y',
            customer_id: params.customerId,
            collect_type: params.collect_type,
            doc_datetime: params.doc_datetime,
        });
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
router.get('/retroactive', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectData_1.CollectData);
        const datas = await repository.find({
            always_yn: 'N',
        });
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
router.get('/retroactive/:customerId/:collect_type/:doc_datetime', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectData_1.CollectData);
        const customerId = req.params.customerId;
        const collect_type = req.params.collect_type;
        const doc_datetime = req.params.doc_datetime;
        const where = Object.assign(Object.assign(Object.assign({ always_yn: 'N' }, (customerId !== "''" && { customerId })), (collect_type !== "''" && { collect_type })), (doc_datetime !== "''" && { doc_datetime }));
        console.log(where);
        const datas = await repository.find(where);
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
exports.default = router;
