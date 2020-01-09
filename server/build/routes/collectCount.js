"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const CollectCount_1 = require("../entities/CollectCount");
const logger_1 = require("../logger");
const router = express.Router();
router.get('/:mode', async (req, res) => {
    try {
        const manager = typeorm_1.getConnectionManager().get('verify');
        const repository = manager.getRepository(CollectCount_1.CollectCount);
        const mode = req.params.mode;
        logger_1.default.debug(`mode ${mode}`);
        var datas = [];
        if (mode === 'always') {
            datas = await repository.find({
                always_yn: 'Y',
            });
        }
        else if (mode === 'retroactive') {
            datas = await repository.find({
                always_yn: 'N',
            });
        }
        res.json(datas);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
        throw new Error(e);
    }
});
exports.default = router;
