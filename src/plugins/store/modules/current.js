import * as run from '@/plugins/store/helper/storeCreator';


const items = [
  'snackbar',
  'loader',
];

export default {
  namespaced: true,
  state: {
    ...run.createState(items),
  },
  // get in component computed as ...mapGetters('current', ['itemName']),
  getters: {
    ...run.createGetters(items),
  },

  // set in component methods as ...mapActions('current', ['setItemName']),
  actions: {
    ...run.createActions(items),
    ...run.createActionCommits(items),
  },

  mutations: {
    ...run.createMutations(items),
  },
};
