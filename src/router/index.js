import Vue from 'vue';
import VueRouter from 'vue-router';
import UpcomingLaunches from '@views/UpcomingLaunches';
import { buildPageTitle } from '@helpers/routerHelper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Upcoming Launches',
    component: UpcomingLaunches,
    meta: { title: 'Upcoming Launches' },
  },
  {
    path: '/under-the-hood',
    name: 'Under the Hood',
    component: () => import(/* webpackChunkName: "underTheHood" */ '@views/UnderTheHood.vue'),
    meta: { title: 'Under the Hood' },
  },
];

const router = new VueRouter({
  routes,
});

router.afterEach(to => {
  // Dynamically change page title depending on next route meta->title
  Vue.nextTick(() => {
    document.title = buildPageTitle(to.meta.title);
  });
});

export default router;
