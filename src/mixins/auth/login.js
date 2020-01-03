import { mapActions } from 'vuex';
import snackbarMethods from '@/mixins/snackbar';


export default {
  mixins: [snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogin']),
    async login(email, password) {
      const user = await this.$fireauth.signInWithEmailAndPassword(email, password)
        .then((payload) => payload.user)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });

      if (user) {
        await this.setLogin(user);
        return true;
      }
      return false;
    },
  },
};
