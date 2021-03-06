import { mapActions } from 'vuex';
import snackbarMethods from '@/mixins/snackbar';


export default {
  mixins: [snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogout']),
    async logout() {
      await this.$fireauth.signOut().catch((error) => {
        this.setSnackbarError({ text: error.message });
      });

      this.setLogout();
    },
  },
};
