import winston, { LoggerOptions } from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

interface LoggerConfig {
  level: LoggerOptions['level'];
  logFiles: FileTransportOptions[];
}

const DEFAULT_CONFIG: LoggerConfig = {
  level: 'info',
  logFiles: [{ filename: './logs/error.log', level: 'error' }, { filename: './logs/combined.log' }],
};

export class Logger {
  constructor(config: LoggerConfig = DEFAULT_CONFIG) {
    const { level, logFiles } = config;

    const transports = logFiles.map((fileConfig) => {
      return new winston.transports.File(fileConfig);
    });

    const logger = winston.createLogger({
      level,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports,
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
          level,
        }),
      );
    }

    const loggerLevels = Object.keys(logger.levels);

    const objElements = loggerLevels.map((level) => {
      return {
        [level]: logger[level].bind(logger),
      };
    });

    Object.assign(this, ...objElements);
  }

  error: winston.LeveledLogMethod;

  warn: winston.LeveledLogMethod;

  info: winston.LeveledLogMethod;

  http: winston.LeveledLogMethod;

  verbose: winston.LeveledLogMethod;

  debug: winston.LeveledLogMethod;

  silly: winston.LeveledLogMethod;
}
