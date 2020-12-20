import Vue from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';

import router from './router';

import '@assets/scss/main.scss';
import '@fortawesome/fontawesome-free/js/all';

Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
