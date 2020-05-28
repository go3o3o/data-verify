import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';

import { createConnection, createConnections } from 'typeorm';

import collectData from './routes/CollectData';
import collectCount from './routes/collectCount';
import dmapRequestRouter from './routes/dmapRequest';
import nodeRequestRouter from './routes/nodeRequest';

import logger from './logger';
import * as appConfig from './config';

const stopServer = async (server: http.Server, signal?: string) => {
  // logger.debug(`Stopping server with signal:  ${signal}`);
  await server.close();
  process.exit();
};

async function runServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/dmap', dmapRequestRouter);
  app.use('/node', nodeRequestRouter);
  app.use('/count', collectCount);
  app.use('/data', collectData);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  const server = app.listen(8000, () => {
    logger.debug('Example app listening on port 8000!');
  });

  createConnections(appConfig.dbOptions)
    .then(async connection => {
      logger.debug('Connected to DB');
    })
    .catch(error => {
      logger.error('TypeORM connection error: ', error);
      console.log(error);
      stopServer(server);
    });
}

runServer()
  .then(() => {
    logger.debug('Server run successfully. ');
  })
  .catch((ex: Error) => {
    logger.error('Unable run:', ex);
  });
