export const Controller = (path: string = '') => {
  return (target: any) => {
    const regex = /(^\/|\/$)/g;

    target.prototype.routes?.forEach((route: any) => {
      if (route.path.replace(regex, '') === '') {
        route.path = `/${path.replace(regex, '')}`;
        return;
      }
      route.path = `${path.replace(regex, '')}/${route.path.replace(regex, '')}` || '/';
    });
  };
} 