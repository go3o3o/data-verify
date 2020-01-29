"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const NodeRequest_1 = require("../entities/NodeRequest");
const router = express.Router();
router.post('/:kind', async (req, res) => {
    const kind = req.params.kind;
    try {
        const manager = typeorm_1.getConnectionManager().get('node');
        const repository = manager.getRepository(NodeRequest_1.NodeRequest);
        var node = [];
        if (kind === 'nodeStatus') {
            node = await repository.find({ seq: 10 });
        }
        if (kind === 'nodeMonitoring') {
            node = await repository.find({ seq: 5 });
        }
        return res.json({ data: node });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
});
exports.default = router;
