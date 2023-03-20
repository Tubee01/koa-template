import { normalizePath } from "./utils";

export const Endpoint = (method: string, path: string = '') => (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) => {
  target.routes = target.routes || [];

  const normalizedPath = normalizePath(path);

  target.routes.push({
    method: method.toUpperCase(),
    path: normalizedPath ? `/${normalizedPath}` : '/',
    handler: descriptor.value,
  });
};