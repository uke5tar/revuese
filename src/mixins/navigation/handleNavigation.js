import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('user', ['logout']),
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
