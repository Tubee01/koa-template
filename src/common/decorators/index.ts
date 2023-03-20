import { Endpoint } from './endpoint.decorator';

export * from './controller.decorator';

export const Get = (path: string = '') => {
  return Endpoint('get', path);
};

export const Post = (path: string = '') => {
  return Endpoint('post', path);
}

export const Put = (path: string = '') => {
  return Endpoint('put', path);
}

export const Delete = (path: string = '') => {
  return Endpoint('delete', path);
}

