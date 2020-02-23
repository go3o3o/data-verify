"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const CollectData_1 = require("./entities/CollectData");
const CollectCount_1 = require("./entities/CollectCount");
const NodeRequest_1 = require("./entities/NodeRequest");
const NodeCustomer_1 = require("./entities/NodeCustomer");
const NodeChannel_1 = require("./entities/NodeChannel");
const NodeProgress_1 = require("./entities/NodeProgress");
const DmapProgress_1 = require("./entities/DmapProgress");
const DmapProject_1 = require("./entities/DmapProject");
const DmapDocCheck_1 = require("./entities/DmapDocCheck");
const DmapSource_1 = require("./entities/DmapSource");
const DmapCustomer_1 = require("./entities/DmapCustomer");
exports.dbOptions = [
    {
        name: 'dmap',
        type: 'mysql',
        host: '54.180.107.9',
        port: 3306,
        username: 'wisenut',
        password: 'wisenut#12',
        database: 'dmap_base',
        entities: [
            DmapProgress_1.DmapProgress,
            DmapProject_1.DmapProject,
            DmapDocCheck_1.DmapDocCheck,
            DmapSource_1.DmapSource,
            DmapCustomer_1.DmapCustomer,
        ],
    },
    {
        name: 'node',
        type: 'mysql',
        host: '54.180.107.9',
        port: 3306,
        username: 'wisenut',
        password: 'wisenut#12',
        database: 'dmap_collector',
        entities: [NodeRequest_1.NodeRequest, NodeCustomer_1.NodeCustomer, NodeChannel_1.NodeChannel, NodeProgress_1.NodeProgress],
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
