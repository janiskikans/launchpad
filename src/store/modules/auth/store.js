import { initializeCsrf, login, logout, getUser } from '@api/launchpadApi/authApi';
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
      router.push({ name: ROUTE_DASHBOARD });
    },

    async [types.LOGOUT]({ dispatch }) {
      const response = await logout();
      if (!response.data || !response.data.success) {
        return;
      }

      dispatch(types.CLEAR_AUTH);

      router.push({ name: ROUTE_LOGIN });
    },

    [types.CLEAR_AUTH_ERROR]({ commit }) {
      commit(types.SET_AUTH_ERROR, '');
    },

    [types.CHECK_AUTH]({ state, dispatch }) {
      if (!state.isAuthorized) {
        return;
      }

      getUser()
        .then(response => {
          // If request failed or no user data returned then we assume that session has expired/user has logged out
          if (response.status !== 200 || !response.data) {
            dispatch(types.CLEAR_AUTH);

            return;
          }

          // If returned user ID does not match with the one stored in state, then we assume that persisted state has been tempered with and we expire auth
          if (response.data.id !== state.currentUser.id) {
            dispatch(types.CLEAR_AUTH);

            return;
          }
        })
        .catch(() => {
          dispatch(types.CLEAR_AUTH);
        });
    },

    [types.CLEAR_AUTH]({ commit }) {
      commit(types.SET_CURRENT_USER, null);
      commit(types.SET_IS_AUTHORIZED, false);
      window.sessionStorage.clear(); // TODO: Remove when not using session storage anymore
    },
  },
};
