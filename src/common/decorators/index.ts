import { Endpoint } from './endpoint.decorator';

export * from './controller.decorator';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const Get = (path: string = '') => {
  return Endpoint(HttpMethod.GET, path);
};

export const Post = (path: string = '') => {
  return Endpoint(HttpMethod.POST, path);
}

export const Put = (path: string = '') => {
  return Endpoint(HttpMethod.PUT, path);
}

export const Delete = (path: string = '') => {
  return Endpoint(HttpMethod.DELETE, path);
}

export const Patch = (path: string = '') => {
  return Endpoint(HttpMethod.PATCH, path);
}

