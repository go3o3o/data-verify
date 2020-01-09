"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const typeorm_1 = require("typeorm");
const collectData_1 = require("./routes/collectData");
const collectCount_1 = require("./routes/collectCount");
const dmapRequest_1 = require("./routes/dmapRequest");
const nodeRequest_1 = require("./routes/nodeRequest");
const logger_1 = require("./logger");
const appConfig = require("./config");
const stopServer = async (server, signal) => {
    await server.close();
    process.exit();
};
async function runServer() {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/dmap', dmapRequest_1.default);
    app.use('/node', nodeRequest_1.default);
    app.use('/verify', collectData_1.default);
    app.use('/count', collectCount_1.default);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    const server = app.listen(8000, () => {
        logger_1.default.debug('Example app listening on port 8000!');
    });
    typeorm_1.createConnections(appConfig.dbOptions)
        .then(async (connection) => {
        logger_1.default.debug('Connected to DB');
    })
        .catch(error => {
        logger_1.default.error('TypeORM connection error: ', error);
        console.log(error);
        stopServer(server);
    });
}
runServer()
    .then(() => {
    logger_1.default.debug('Server run successfully. ');
})
    .catch((ex) => {
    logger_1.default.error('Unable run:', ex);
});
