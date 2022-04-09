import Vue from 'vue';
import VueRouter from 'vue-router';
import UpcomingLaunches from '@views/UpcomingLaunches';
import { buildPageTitle } from '@helpers/routerHelper';
import store from '@store';

// Main routes
export const ROUTE_UPCOMING = 'Upcoming Launches';
export const ROUTE_ABOUT = 'About';
export const ROUTE_LOGIN = 'Login';
export const ROUTE_404 = 'Page Not Found';

// Dashboard routes
export const ROUTE_DASHBOARD_OVERVIEW = 'Overview - Dashboard';
export const ROUTE_DASHBOARD_URL_MANAGER = 'External URL Manager - Dashbaord';

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
    component: () => import(/* webpackChunkName "dashboard" */ '@views/Dashboard'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: ROUTE_DASHBOARD_OVERVIEW,
        component: () => import(/* webpackChunkName: "dashboard-overview" */ '@views/Dashboard/Overview'),
        meta: { title: ROUTE_DASHBOARD_OVERVIEW, requiresAuth: true },
      },
      {
        path: 'url-manager',
        name: ROUTE_DASHBOARD_URL_MANAGER,
        component: () =>
          import(/* webpackChunkName: "dashboard-external-url-manager" */ '@views/Dashboard/ExternalUrlManager'),
        meta: { title: ROUTE_DASHBOARD_URL_MANAGER, requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: ROUTE_LOGIN,
    component: () => import(/* webpackChunkName "login" */ '@views/Login'),
    meta: { title: ROUTE_LOGIN },
  },
  {
    path: '*',
    name: ROUTE_404,
    component: () => import(/* webpackChunkName "page-not-found" */ '@views/PageNotFound'),
    meta: { title: ROUTE_404 },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // Ensure that we are still authorized
  store.dispatch('auth/CHECK_AUTH');

  /** @type {boolean} */
  const isAuthorized = store.state.auth.isAuthorized;

  // Restrict access to protected routes if user is not authorized
  if (to.matched.some(route => route.meta.requiresAuth) && !isAuthorized) {
    next({ name: ROUTE_UPCOMING });

    return;
  }

  /** If we're is authorized and trying to access login the redirect straight to Dashboard */
  if (to.name === ROUTE_LOGIN && isAuthorized) {
    next({ name: ROUTE_DASHBOARD_OVERVIEW });

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
