"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const DmapRequest_1 = require("../entities/DmapRequest");
const router = express.Router();
router.get('', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('dmap');
        const repository = manager.getRepository(DmapRequest_1.DmapRequest);
        const datas = await repository.find();
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
exports.default = router;
