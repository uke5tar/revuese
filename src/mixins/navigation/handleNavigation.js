import logout from '@/mixins/auth/logout';

export default {
  mixins: [logout],
  methods: {
    handleNavigation(item) {
      if (item.id === 'logout') {
        return this.logout();
      }
      if (item.path !== this.$router.history.current.path) {
        return this.$router.push(item.path);
      }
      return false;
    },
  },
};
