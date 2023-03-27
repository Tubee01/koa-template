import Application, { Context, Next } from 'koa';
import KoaRouter from '@koa/router';
import { HttpMethodEnum } from 'koa-body';
import { container } from './container';

interface ClassConstructor<T> {
  new (app: Application): { routes: Route[] } & T;
}

export type Route = {
  method: HttpMethodEnum;
  path: string;
  handler: {
    name: string;
    [key: string]: any;
  };
};

export class Router<T> {
  public readonly router: KoaRouter = new KoaRouter();

  public readonly controllers: ClassConstructor<T>[] = [];

  constructor(private readonly app: Application, controllers: T[]) {
    const { logger } = this.app.context;

    this.controllers = controllers as ClassConstructor<T>[];

    function controllerCallback<C>(controllerInstance: C, handler: string) {
      return async (ctx: Context, next: Next) => await controllerInstance[handler](ctx, next);
    }

    this.controllers.forEach((controller) => {
      const controllerInstance = container.resolve(controller.name);
      const { routes } = controllerInstance;

      if (!routes || !routes.length) {
        return;
      }

      routes.forEach((route: Route) => {
        const {
          method,
          path,
          handler: { name },
        } = route;

        logger.info(`mapped ${method} ${path}`, this.constructor.name);

        this.router[method.toLowerCase()](path, controllerCallback(controllerInstance, name));
      });
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}
