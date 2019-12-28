/*
How to use:
- import as mixin
- add forceRerenderKey as key to component :key="foreRerenderKey"
- call foreRerender method when the component needs to rerender
*/
export default {
  data: () => ({
    forceRerenderKey: 1,
  }),
  methods: {
    forceRerender() {
      this.forceRerenderKey += 1;
    },
  },
};
