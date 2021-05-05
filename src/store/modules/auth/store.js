import { initializeCsrf, login } from '@api/launchpadApi/authApi';
import * as types from '@store/modules/auth/types';
import User from '@/structures/user';

export default {
  namespaced: true,

  state: () => ({
    /** @type {boolean} */
    isAuthorized: false,
    /** @type {User|null} */
    currentUser: null,
    authError: '',
  }),

  mutations: {
    [types.SET_CURRENT_USER]: (state, user) => (state.currentUser = user),
    [types.SET_AUTH_ERROR]: (state, message) => (state.authError = message),
  },

  actions: {
    async [types.ATTEMPT_LOGIN]({ commit, state }, { email, password }) {
      if (state.isAuthorized) {
        return;
      }

      await initializeCsrf();

      const response = await login(email, password);
      response.data = null;
      if (!response.data) {
        commit(types.SET_AUTH_ERROR, 'There was a problem loggin in');

        return;
      }

      const user = response.data;

      commit(types.SET_CURRENT_USER, new User(user));

      console.log(user);
    },

    async [types.CLEAR_AUTH_ERROR]({ commit }) {
      commit(types.SET_AUTH_ERROR, '');
    },
  },
};
