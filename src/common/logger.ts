import winston from 'winston';
import chalk from 'chalk';

export class Logger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
          level: 'debug',
        }),
      );
    }
  }

  public info(message: string, color = 'whiteBright') {
    this.logger.info(chalk[color](message));
  }

  public error(message: string, color = 'red') {
    this.logger.error(chalk[color](message));
  }

  public warn(message: string, color = 'yellow') {
    this.logger.warn(chalk[color](message));
  }

  public debug(message: string, color = 'blue') {
    this.logger.debug(chalk[color](message));
  }

  public verbose(message: string, color = 'cyan') {
    this.logger.verbose(chalk[color](message));
  }

  public silly(message: string, color = 'magenta') {
    this.logger.silly(chalk[color](message));
  }

  public log(level: string, message: string, color = 'whiteBright') {
    this.logger.log(level, chalk[color](message));
  }

  public stream = {
    write: (message: string) => {
      this.logger.info(chalk.whiteBright(message));
    },
  };
}
