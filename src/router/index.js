import Vue from 'vue';
import VueRouter from 'vue-router';
import UpcomingLaunches from '../views/UpcomingLaunches.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Upcoming Launches',
    component: UpcomingLaunches,
  },
  {
    path: '/under-the-hood',
    name: 'Under the Hood',
    component: () => import(/* webpackChunkName: "underTheHood" */ '../views/UnderTheHood.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
