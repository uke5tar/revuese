import Vue from 'vue';
import Router from 'vue-router';
import { createDynamicRoutes, pathTo, checkAuthAndAbilities } from './helper';


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

router.beforeEach(checkAuthAndAbilities);


Vue.use(Router);

export default router;
