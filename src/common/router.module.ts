import Application, { Context, Next } from "koa";
import Router from "@koa/router";

interface ClassConstructor<T> {
  new (...args: any[]): T;
}

export class RouterModule<T> {
  private readonly router: Router = new Router();
  private readonly routes: ClassConstructor<T>[] = [];
  constructor(private readonly app: Application, routes: ClassConstructor<T>[]) {
    this.routes = routes;
  }

  private get controllers() {
    const { logger } = this.app.context;

    for (const route of this.routes) {
      logger.verbose(`[${this.constructor.name}]: ${route.name} loaded`);
    }

    return this.routes;
  }

  public init() {
    this.controllers.map((controller: any, i: number) => {
      const { logger } = this.app.context;
      const { routes } = controller.prototype;

      routes.forEach((route: { path: string, method: string, handler: Function }) => {
        const { path, method, handler } = route;

        logger.verbose(`[${this.constructor.name}]: ${method} ${path}`);
        switch (method) {
          case 'GET':
            this.router.get(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'POST':
            this.router.post(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'PUT':
            this.router.put(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'DELETE':
            this.router.delete(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'PATCH':
            this.router.patch(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          default:
            throw new Error(`Method ${method} not supported`);
        }
      })
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}