import * as types from '@store/modules/app/types';

const DEFAULT_OPTIONS = {
  duration: 3000,
  delay: 0,
  message: 'Want to snack?',
};

export default {
  namespaced: true,

  state: () => ({
    /** @type {string} */
    snackMessage: '',
  }),

  mutations: {
    [types.SET_SNACK_MESSAGE]: (state, message) => (state.snackMessage = message),
  },

  actions: {
    [types.SHOW_SNACK]({ commit }, options) {
      const snackOptions = { ...DEFAULT_OPTIONS, ...options };

      setTimeout(() => {
        commit(types.SET_SNACK_MESSAGE, snackOptions.message);

        setTimeout(() => {
          commit(types.SET_SNACK_MESSAGE, '');
        }, snackOptions.duration);
      }, snackOptions.delay);
    },
  },
};
