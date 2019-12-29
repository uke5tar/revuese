export default {
  methods: {
    handleNavigation(item) {
      if (item.id === 'logout') {
        return this.logout(this);
      }
      if (item.path !== this.$router.history.current.path) {
        return this.$router.push(item.path);
      }
      return false;
    },
  },
};
