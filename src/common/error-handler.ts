import { Context, HttpError } from "koa";
import { Logger } from "./logger";

export class AppErrorHandle {
  private static logger = new Logger();
  public static handleError(err: any, ctx: Context) {

    if (err instanceof HttpError) {
      ctx.status = 400
      ctx.body = {
        status: -1,
        message: err.message || 'Bad Request',
      };

    } else {
      ctx.status = 500;
      ctx.body = {
        status: -1,
        message: err.message || 'Internal Server Error',
      };
    }

    this.logger.error(JSON.stringify(err));
    ctx.app.emit('error', err, ctx);
  }
}
