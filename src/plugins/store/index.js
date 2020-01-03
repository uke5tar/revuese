import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import { vuexfireMutations } from 'vuexfire';
import current from './modules/current';
import user from './modules/user';

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'countMyFood',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })],
  modules: {
    current,
    user,
  },
  mutations: {
    ...vuexfireMutations,
  },
});
