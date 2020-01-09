"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const CollectData_1 = require("./entities/CollectData");
const CollectCount_1 = require("./entities/CollectCount");
const NodeRequest_1 = require("./entities/NodeRequest");
const DmapRequest_1 = require("./entities/DmapRequest");
exports.dbOptions = [
    {
        name: 'dmap',
        type: 'mysql',
        host: '54.180.107.9',
        port: 3306,
        username: 'wisenut',
        password: 'wisenut#12',
        database: 'dmap_base',
        entities: [DmapRequest_1.DmapRequest],
    },
    {
        name: 'node',
        type: 'mysql',
        host: '54.180.107.9',
        port: 3306,
        username: 'wisenut',
        password: 'wisenut#12',
        database: 'dmap_collector',
        entities: [NodeRequest_1.NodeRequest],
    },
    {
        name: 'verify',
        type: 'mysql',
        host: '54.180.107.9',
        port: 3306,
        username: 'wisenut',
        password: 'wisenut#12',
        database: 'data_verify',
        entities: [CollectData_1.CollectData, CollectCount_1.CollectCount],
    },
];
