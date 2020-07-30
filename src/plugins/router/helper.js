import store from '@/plugins/store';
import getAllFiles from '@/helper/getAllFiles';


const HOME = 'home';

const createDynamicPagePaths = () => {
  const pathNames = getAllFiles(require.context('@/pages/', true, /\.(vue)$/i));
  const paths = {};

  pathNames.forEach((pathName) => {
    paths[pathName] = pathName === HOME ? '/' : `/${pathName.replace(/_/g, '-')}`;
  });

  return paths;
};

export const pathTo = {
  ...createDynamicPagePaths(),
};

export const createDynamicRoutes = () => {
  const pathNames = getAllFiles(require.context('@/pages/', true, /\.(vue)$/i))
    .map((path) => path.replace(/_/g, '-'));

  const pagesRequireAuth = [];

  const dynamicRoutes = pathNames.map((pathName) => {
    const route = {
      path: pathName === HOME ? pathTo.home : `/${pathName}`,
      name: pathName.replace(/-/g, ' '),
      component: () => import(`@/pages/${pathName.replace(/-/g, '_')}`),
      meta: {
        requiresAuth: pagesRequireAuth.includes(`/${pathName}`),
      },
    };

    return route;
  });

  return dynamicRoutes;
};


export const checkAuth = (to, from, next) => {
  const redirectIfAuthenticated = [
    pathTo.login,
    pathTo.signup,
    pathTo.passwordreset,
  ];

  const pathRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const shouldRedirectIfAuthenticated = to.matched.some((record) => redirectIfAuthenticated.includes(record.path));
  const userIsAuthenticated = store.getters['user/userIsAuthenticated'];
  const isPageReload = from.name === null;

  if (pathRequiresAuth && !userIsAuthenticated) {
    next({ path: pathTo.login });
  } else if (userIsAuthenticated && shouldRedirectIfAuthenticated && !isPageReload) {
    next({ path: pathTo.home });
  } else {
    next();
  }
};
