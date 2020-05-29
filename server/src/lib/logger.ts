import * as winston from 'winston';
import * as moment from 'moment';

const colorizer = winston.format.colorize();

moment().utcOffset('+09:00');

var logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.simple(),
    winston.format.printf(msg =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - ${msg.level}: ${msg.message}`,
      ),
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf(msg =>
          colorizer.colorize(
            msg.level,
            `${msg.timestamp} - ${msg.level}: ${msg.message}`,
          ),
        ),
      ),
    }),
  ],
});

export default logger;
