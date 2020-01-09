"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const NodeRequest_1 = require("../entities/NodeRequest");
const router = express.Router();
router.get('/status', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('node');
        const repository = manager.getRepository(NodeRequest_1.NodeRequest);
        const datas = await repository.find();
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
router.get('/monitoring', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('node');
        const repository = manager.getRepository(NodeRequest_1.NodeRequest);
        const datas = await repository.find({ seq: 2 });
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
exports.default = router;
