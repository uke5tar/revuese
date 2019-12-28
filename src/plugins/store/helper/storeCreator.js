const formatNamingAllCaps = item => item
  .split(/(?=[A-Z])/)
  .map(part => part.toUpperCase())
  .join('_');

const formatNamingFirstLetterCap = item => item
  .charAt(0)
  .toUpperCase() + item.slice(1);


export const createState = (items) => {
  const state = {};
  items.forEach((item) => {
    state[item] = null;
  });
  return state;
};

export const createGetters = (items) => {
  const getters = {};
  items.forEach((item) => {
    getters[item] = state => state[item];
  });
  return getters;
};

export const createActions = (items) => {
  const actions = {};
  items.forEach((item) => {
    const action = `set${formatNamingFirstLetterCap(item)}`;
    const comitter = `set${formatNamingAllCaps(item)}`;

    actions[action] = ({ dispatch }, value) => {
      dispatch(comitter, value);
    };
  });
  return actions;
};

export const createActionCommits = (items) => {
  const actionCommits = {};
  items.forEach((item) => {
    const comitter = `set${formatNamingAllCaps(item)}`;

    actionCommits[comitter] = ({ commit }, value) => {
      commit(comitter, value);
    };
  });
  return actionCommits;
};

export const createMutations = (items) => {
  const mutations = {};
  items.forEach((item) => {
    const mutation = `set${formatNamingAllCaps(item)}`;

    mutations[mutation] = (state, value) => {
      state[item] = value;
    };
  });
  return mutations;
};
