import Application, { Context, Next } from 'koa';
import KoaRouter from '@koa/router';
import { HttpMethod } from './decorators';

interface ClassConstructor<T> {
  new (app: Application): { routes: Route[] } & T;
}

type Route = {
  method: HttpMethod;
  path: string;
  handler: {
    name: string;
    [key: string]: any;
  };
};
export class Router<T> {
  private readonly router: KoaRouter = new KoaRouter();

  private readonly controllers: ClassConstructor<T>[] = [];

  constructor(private readonly app: Application, controllers: T[]) {
    this.controllers = controllers as ClassConstructor<T>[];
  }

  public init() {
    const { logger } = this.app.context;

    function controllerCallback(controllerInstance: any, handler: string) {
      return async (ctx: Context, next: Next) => {
        const result = await controllerInstance[handler](ctx, next);
        if (result !== undefined) {
          ctx.body = result;
        }
      };
    }

    this.controllers.forEach((controller) => {
      const controllerInstance = new controller(this.app);
      const { routes } = controllerInstance;

      if (!routes || !routes.length) {
        return;
      }

      logger.info(`[${this.constructor.name}]: ${controllerInstance.constructor.name} loaded`);

      routes.forEach((route: Route) => {
        const {
          method,
          path,
          handler: { name },
        } = route;

        logger.info(`[${this.constructor.name}]: ${method} ${path}`);

        this.router[method.toLowerCase()](path, controllerCallback(controllerInstance, name));
      });
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}
