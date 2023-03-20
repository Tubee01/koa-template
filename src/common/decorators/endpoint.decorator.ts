export const Endpoint = (method: string, path: string = '') => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    if (!target.routes) {
      target.routes = [];
    }
    const regex = /(^\/|\/$)/g;

    target.routes.push({
      method: method.toUpperCase(),
      path: `/${path.replace(regex, '')}` || '/',
      handler: descriptor.value,
    });
  };
}