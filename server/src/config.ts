import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { CollectData } from './entities/CollectData';
import { CollectCount } from './entities/CollectCount';
import { NodeRequest } from './entities/NodeRequest';
import { DmapRequest } from './entities/DmapRequest';

export let dbOptions: ConnectionOptions[] = [
  {
    name: 'dmap',
    type: 'mysql',
    host: '54.180.107.9',
    port: 3306,
    username: 'wisenut',
    password: 'wisenut#12',
    database: 'dmap_base',
    entities: [DmapRequest],
  },
  {
    name: 'node',
    type: 'mysql',
    host: '54.180.107.9',
    port: 3306,
    username: 'wisenut',
    password: 'wisenut#12',
    database: 'dmap_collector',
    entities: [NodeRequest],
  },
  {
    name: 'verify',
    type: 'mysql',
    host: '54.180.107.9',
    port: 3306,
    username: 'wisenut',
    password: 'wisenut#12',
    database: 'data_verify',
    entities: [CollectData, CollectCount],
  },
];
