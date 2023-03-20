import { normalizePath } from "./utils";

export const Controller = (path: string = '') => (target: any) => {
  target.prototype.routes?.forEach((route: any) => {
    const normalizedPath = normalizePath(path);
    const normalizedRoutePath = normalizePath(route.path);
    route.path = normalizedRoutePath ? `${normalizedPath}/${normalizedRoutePath}` : `/${normalizedPath}`;
  });
};
