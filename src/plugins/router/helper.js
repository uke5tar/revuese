import store from '@/plugins/store';
import getAllFiles from '@/helper/getAllFiles';


const HOME = 'home';

const createDynamicPagePaths = () => {
  const pathNames = getAllFiles(require.context('@/pages/', true, /\.(vue)$/i));
  const paths = {};

  pathNames.forEach((pathName) => {
    paths[pathName] = pathName === HOME ? '/' : `/${pathName}`;
  });

  return paths;
};

export const pathTo = {
  ...createDynamicPagePaths(),
};

export const createDynamicRoutes = () => {
  const pathNames = getAllFiles(require.context('@/pages/', true, /\.(vue)$/i));
  const pagesRequireNoAuth = [pathTo.login, pathTo.error];

  const dynamicRoutes = pathNames.map((pathName) => {
    const route = {
      path: pathName === HOME ? pathTo.home : `/${pathName}`,
      name: pathName,
      component: () => import(`@/pages/${pathName}`),
      meta: {
        requiresAuth: !pagesRequireNoAuth.includes(`/${pathName}`),
      },
    };

    return route;
  });

  return dynamicRoutes;
};


export const checkAuth = (to, from, next) => {
  const pathRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userIsAuthenticated = store.getters['user/userIsAuthenticated'];

  if (pathRequiresAuth && !userIsAuthenticated) {
    next({ path: pathTo.login });
  } else {
    next();
  }
};
