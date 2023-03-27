import { container } from '@common/container';
import { asClass } from 'awilix';
import { registerDependencies } from './utils';

export function Injectable() {
  return function (target: any) {
    registerDependencies(target);
    container.register({
      [target.name]: asClass(target),
    });
  };
}
