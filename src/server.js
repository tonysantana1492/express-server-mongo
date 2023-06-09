const http = require('http');
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const mongoose = require('./config/mongoose');

const server = http.createServer(app);

mongoose(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
