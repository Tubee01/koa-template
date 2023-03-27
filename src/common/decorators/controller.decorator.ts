import { Route } from '@common/router';
import { normalizePath, registerDependencies } from './utils';
import { container } from '@common/container';
import { asClass } from 'awilix';

export const Controller =
  (path = '') =>
  (target: any) => {
    target.prototype.routes?.forEach((route: Route) => {
      const normalizedPath = normalizePath(path);
      const normalizedRoutePath = normalizePath(route.path);

      if (normalizedPath === '' || normalizedPath === '/') {
        route.path = `/${normalizedRoutePath}`;
        return;
      }

      route.path = `/${normalizedPath}/${normalizedRoutePath}`;
    });

    registerDependencies(target);

    container.register({
      [target.name]: asClass(target),
    });
  };
