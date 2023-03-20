import winston from "winston";

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
      this.logger
        .add(new winston.transports.Console({
          format: winston.format.simple(),
          level: 'debug'
        }));

    }
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }

  public verbose(message: string) {
    this.logger.verbose(message);
  }

  public silly(message: string) {
    this.logger.silly(message);
  }

  public log(level: string, message: string) {
    this.logger.log(level, message);
  }

  public stream = {
    write: (message: string) => {
      this.logger.info(message);
    }
  }
}