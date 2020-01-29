"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const DmapRequest_1 = require("../entities/DmapRequest");
const router = express.Router();
router.post('/:kind', async (req, res) => {
    const kind = req.params.kind;
    try {
        const manager = typeorm_1.getConnectionManager().get('dmap');
        const repository = manager.getRepository(DmapRequest_1.DmapRequest);
        var dmap = [];
        if (kind === 'dmapStatus') {
            dmap = await repository.find({ seq: 10 });
        }
        if (kind === 'dmapMonitoring') {
            dmap = await repository.find({ seq: 2 });
        }
        return res.json({ data: dmap });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
});
exports.default = router;
