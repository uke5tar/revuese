const initialState = {
  data: {
    userName: null,
    email: null,
    uid: null,
    appLanguage: null,
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
    userUid (state) {
      return state.data.uid;
    },
    appLanguage (state) {
      return state.data.appLanguage;
    },
  },

  actions: {
    setUserData ({ dispatch }, userData) {
      dispatch('setUSER_DATA', userData);
    },

    setAppLanguage ({ dispatch }, appLanguage) {
      dispatch('setAPP_LANGUAGE', appLanguage);
    },

    setLogin ({ dispatch }, user) {
      const userData = {
        userName: user.userName,
        email: user.email,
        uid: user.uid,
      };

      dispatch('setUSER_DATA', userData);
      dispatch('setUSER_AUTH', true);
    },

    setLogout ({ dispatch }) {
      dispatch('setUSER_DATA', initialState.user);
      window.localStorage.removeItem('revuese');
      window.location.reload();
    },

    setUSER_DATA ({ commit }, userData) {
      commit('setUSER_DATA', userData);
    },
    setUSER_AUTH ({ commit }, authStatus) {
      commit('setUSER_AUTH', authStatus);
    },
    setAPP_LANGUAGE({ commit }, appLanguage) {
      commit('setAPP_LANGUAGE', appLanguage);
    },
  },

  mutations: {
    setUSER_DATA(state, userData) {
      state.data = { ...state.data, ...userData };
    },
    setUSER_AUTH(state, authStatus) {
      state.isAuthenticated = authStatus;
    },
    setAPP_LANGUAGE(state, appLanguage) {
      state.data.appLanguage = appLanguage;
    },
  },
};
