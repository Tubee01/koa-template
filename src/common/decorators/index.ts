import { Endpoint } from './endpoint.decorator';

export * from './controller.decorator';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const Get = (path = '') => {
  return Endpoint(HttpMethod.GET, path);
};

export const Post = (path = '') => {
  return Endpoint(HttpMethod.POST, path);
};

export const Put = (path = '') => {
  return Endpoint(HttpMethod.PUT, path);
};

export const Delete = (path = '') => {
  return Endpoint(HttpMethod.DELETE, path);
};

export const Patch = (path = '') => {
  return Endpoint(HttpMethod.PATCH, path);
};
