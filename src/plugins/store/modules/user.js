/* eslint-disable camelcase */
const initialState = {
  data: {
    email: null,
  },
  isAuthenticated: false,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },

  getters: {
    userData (state) {
      return state.data;
    },
    userIsAuthenticated(state) {
      return state.isAuthenticated;
    },
  },

  actions: {
    setUserData ({ dispatch }, data) {
      const { userData } = data;

      dispatch('setUSER_DATA', userData);
    },

    async logout ({ dispatch }, user) {
      try {
        await user.$firebaseApi.logout();
        dispatch('setUSER_DATA', initialState.user);

        window.localStorage.removeItem('countMyFood');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },

    setUSER_DATA ({ commit }, userData) {
      commit('setUSER_DATA', userData);
    },
    setUSER_AUTH ({ commit }, authStatus) {
      commit('setUSER_AUTH', authStatus);
    },
  },

  mutations: {
    setUSER_DATA(state, userData) {
      state.data = { ...state.data, ...userData };
    },
    setUSER_AUTH(state, authStatus) {
      state.isAuthenticated = authStatus;
    },
  },
};
