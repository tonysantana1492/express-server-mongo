const config = require('.');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = function (app) {
  logger.info('connecting to', config.MONGODB_URI);

  mongoose.set('strictQuery', true);

  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });

  mongoose.Promise = global.Promise;

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  if (app) {
    app.set('mongoose', mongoose);
  }
};

function cleanup() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}
