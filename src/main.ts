import { AppErrorHandle } from '@common/error-handler';
import { Logger } from '@common/logger';
import { RouterModule } from '@common/router.module';
import Koa from 'koa';
import koaBody from 'koa-body';
import json from 'koa-json';
import KoaLogger from 'koa-logger';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import { AppController } from './routes/app.controller';

declare module 'koa' {
  interface BaseContext {
    logger: Logger;
  }
}

const APP_PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  const logger = new Logger();
  const app = new Koa();

  /*
  * Logger
  */
  app.context.logger = logger;

  /*
  * Swagger
  */
  const spec = yamljs.load('./openapi.yml');
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        spec,
      },
    }),
  );

  /*
  * Middleware
  */
  app.use(koaBody());
  app.use(KoaLogger());
  app.use(json());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      AppErrorHandle.handleError(err, ctx);
    }
  });

  /*
  * Routes
  */
  const routes = [AppController];
  new RouterModule(app, routes).init();

  app.listen(APP_PORT).on('listening', () => {
    logger.info(`Server listening on port ${APP_PORT}`);
    logger.info(`URL: http://localhost:${APP_PORT}`);
    logger.info(`Swagger UI available at http://localhost:${APP_PORT}/swagger`);
  });
}

bootstrap();