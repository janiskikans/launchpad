import { initializeCsrf, login, logout } from '@api/launchpadApi/authApi';
import * as types from '@store/modules/auth/types';
import User from '@/structures/user';
import router, { ROUTE_DASHBOARD, ROUTE_LOGIN } from '@router';

export default {
  namespaced: true,

  state: () => ({
    /** @type {boolean} */
    isAuthorized: false,
    /** @type {User|null} */
    currentUser: null,
    /** @type {string} */
    authError: '',
  }),

  mutations: {
    [types.SET_CURRENT_USER]: (state, user) => (state.currentUser = user),
    [types.SET_AUTH_ERROR]: (state, message) => (state.authError = message),
    [types.SET_IS_AUTHORIZED]: (state, isAuthorized) => (state.isAuthorized = isAuthorized),
  },

  actions: {
    async [types.LOGIN]({ commit, state }, { email, password }) {
      if (state.isAuthorized) {
        return;
      }

      await initializeCsrf();
      const response = await login(email, password);

      if (!response.data) {
        commit(types.SET_AUTH_ERROR, 'There was a problem loggin in');

        return;
      }

      if (response.data.message) {
        commit(types.SET_AUTH_ERROR, response.message);

        return;
      }

      commit(types.SET_CURRENT_USER, new User(response.data.data));
      commit(types.SET_IS_AUTHORIZED, true);
      router.push(ROUTE_DASHBOARD);
    },

    async [types.LOGOUT]({ commit }) {
      const response = await logout();
      if (!response.data || !response.data.success) {
        return;
      }

      commit(types.SET_CURRENT_USER, null);
      commit(types.SET_IS_AUTHORIZED, false);
      router.push(ROUTE_LOGIN);
    },

    async [types.CLEAR_AUTH_ERROR]({ commit }) {
      commit(types.SET_AUTH_ERROR, '');
    },
  },
};
