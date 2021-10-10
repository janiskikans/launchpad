import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@store/modules/auth/store';
import App from '@store/modules/app/store';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: Auth,
    app: App,
  },
  plugins: [
    createPersistedState({
      paths: ['auth.isAuthorized', 'auth.currentUser'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => {
          Cookies.set(key, value, {
            expires: 3,
            domain: process.env.NODE_ENV === 'development' ? '.launchpadapp.test' : '.launchpadapp.space',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'development' ? false : true,
          });
        },
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
});
