import Vue from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';
import VueAnimXYZ from '@animxyz/vue';

import router from './router';
import store from './store';

import '@assets/scss/main.scss';
import '@animxyz/core';

Vue.use(VTooltip);
Vue.use(VueAnimXYZ);

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
