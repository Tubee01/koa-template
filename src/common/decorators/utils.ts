import { container } from '@common/container';
import { asClass } from 'awilix';
import 'reflect-metadata';

export const normalizePath = (path: string) => path.replace(/(^\/+|\/+$)/g, '');

export const registerDependencies = (target: any) => {
  const dependencies = Reflect.getMetadata('design:paramtypes', target) || [];

  dependencies.forEach((dependency: any) => {
    const name = dependency.name.charAt(0).toLowerCase() + dependency.name.slice(1);

    container.register({
      [name]: asClass(dependency),
    });
  });

  container.register({
    [target.name]: asClass(target),
  });
};
