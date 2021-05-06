import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@store/modules/auth/store';
import App from '@store/modules/app/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: Auth,
    app: App,
  },
});
