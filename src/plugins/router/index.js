import Vue from 'vue';
import Router from 'vue-router';
import { createDynamicRoutes, pathTo, checkAuth } from './helper';


const routes = [
  {
    path: '*',
    redirect: pathTo.home,
  },
  ...createDynamicRoutes(),
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach(checkAuth);


Vue.use(Router);

export default router;
