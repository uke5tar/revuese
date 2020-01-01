import _default from '@/config/defaults';

const initialState = {
  data: {
    displayName: null,
    email: null,
    uid: null,
    language: _default.language,
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

    setUserLanguage ({ dispatch }, language) {
      dispatch('setUSER_LANGUAGE', language);
    },

    async login ({ dispatch }, firebaseUser) {
      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
      };

      dispatch('setUSER_DATA', userData);
      dispatch('setUSER_AUTH', true);
    },

    async logout ({ dispatch }, user) {
      await user.$firebaseApi.auth().signOut();
      dispatch('setUSER_DATA', initialState.user);

      window.localStorage.removeItem('countMyFood');
      window.location.reload();
    },

    setUSER_DATA ({ commit }, userData) {
      commit('setUSER_DATA', userData);
    },
    setUSER_AUTH ({ commit }, authStatus) {
      commit('setUSER_AUTH', authStatus);
    },
    setUSER_LANGUAGE({ commit }, language) {
      commit('setUSER_LANGUAGE', language);
    },
  },

  mutations: {
    setUSER_DATA(state, userData) {
      state.data = { ...state.data, ...userData };
    },
    setUSER_AUTH(state, authStatus) {
      state.isAuthenticated = authStatus;
    },
    setUSER_LANGUAGE(state, language) {
      state.data.language = language;
    },
  },
};
