import Application, { Context, Next } from "koa";
import KoaRouter from "@koa/router";
import { HttpMethod } from "./decorators";

interface ClassConstructor {
  new(app: Application): any;
}
export class Router<T extends ClassConstructor> {
  private readonly router: KoaRouter = new KoaRouter();
  private readonly controllers: Array<T>;

  constructor(private readonly app: Application, controllers: Array<T>) {
    this.controllers = controllers;
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

    this.controllers.forEach(controller => {
      const controllerInstance = new controller(this.app);
      const { routes } = controllerInstance;

      logger.info(`[${this.constructor.name}]: ${controllerInstance.constructor.name} loaded`);

      routes.forEach(route => {
        const { method, path, handler: { name } } = route;

        logger.info(`[${this.constructor.name}]: ${method} ${path}`);

        switch (method) {
          case HttpMethod.GET:
            this.router.get(path, controllerCallback(controllerInstance, name));
            break;
          case HttpMethod.POST:
            this.router.post(path, controllerCallback(controllerInstance, name));
            break;
          case HttpMethod.PUT:
            this.router.put(path, controllerCallback(controllerInstance, name));
            break;
          case HttpMethod.DELETE:
            this.router.delete(path, controllerCallback(controllerInstance, name));
            break;
          case HttpMethod.PATCH:
            this.router.patch(path, controllerCallback(controllerInstance, name));
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
