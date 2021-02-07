import Vue from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';
import VueAnimXYZ from '@animxyz/vue';

import router from './router';

import '@assets/scss/main.scss';
import '@fortawesome/fontawesome-free/js/all';
import '@animxyz/core';

Vue.use(VTooltip);
Vue.use(VueAnimXYZ);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
