import Vue from 'vue';
import VueRouter from 'vue-router';
import UpcomingLaunches from '@views/UpcomingLaunches';
import { buildPageTitle } from '@helpers/routerHelper';
import store from '@store';

const ROUTE_UPCOMING = 'Upcoming Launches';
const ROUTE_ABOUT = 'About';
const ROUTE_DASHBOARD = 'Dashboard';
const ROUTE_LOGIN = 'Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTE_UPCOMING,
    component: UpcomingLaunches,
    meta: { title: ROUTE_UPCOMING },
  },
  {
    path: '/about',
    name: ROUTE_ABOUT,
    component: () => import(/* webpackChunkName: "about" */ '@views/About'),
    meta: { title: ROUTE_ABOUT },
  },
  {
    path: '/dashboard',
    name: ROUTE_DASHBOARD,
    component: () => import(/* webpackChunkNameL "dashboard" */ '@views/Dashboard'),
    meta: { title: ROUTE_DASHBOARD },
  },
  {
    path: '/login',
    name: ROUTE_LOGIN,
    component: () => import(/* webpackChunkNameL "login" */ '@views/Login'),
    meta: { title: ROUTE_LOGIN },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  /** @type {boolean} */
  const isAuthorized = store.state.auth.isAuthorized;

  // Restrict acces to Dashboard if user is not authorized
  if (to.name === ROUTE_DASHBOARD && !isAuthorized) {
    next({ name: ROUTE_UPCOMING });

    return;
  }

  /** If we're is authorized and trying to access login the redirect straight to Dashboard */
  if (to.name === ROUTE_LOGIN && isAuthorized) {
    next({ name: ROUTE_DASHBOARD });

    return;
  }

  next();
});

router.afterEach(to => {
  // Dynamically change page title depending on next route meta->title
  Vue.nextTick(() => {
    document.title = buildPageTitle(to.meta.title);
  });
});

export default router;
