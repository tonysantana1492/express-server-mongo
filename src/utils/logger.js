// const info = (...params) => {
//   console.log(...params);
// };

// const error = (...params) => {
//   console.error(...params);
// };

// module.exports = {
//   info, error
// };

const winston = require( 'winston' );
const { combine, timestamp } = winston.format;
const config = require('../config');
const fs = require( 'fs' );

const logDir = 'log';
const colors = {
  emerg: 'yellow',
  alert: 'yellow',
  crit: 'red',
  error: 'red',
  warning: 'yellow',
  notice: 'green',
  info: 'blue',
  debug: 'green',
};

if ( !fs.existsSync( logDir ) ) {
  fs.mkdirSync( logDir );
}

winston.addColors(colors);

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    timestamp(),
  ),
  transports: [
    new winston.transports.File({
      filename: `${ logDir }/info.log`,
      level: 'info',
      format: winston.format.combine(
        winston.format.json(),
      )
    }),
    new winston.transports.File({
      filename: `${ logDir }/error.log`,
      level: 'error',
      format: winston.format.combine(
        winston.format.json(),
      )
    }),
  ]
});

if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;