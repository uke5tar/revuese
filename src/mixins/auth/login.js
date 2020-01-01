import { mapActions } from 'vuex';
import snackbarMethods from '@/mixins/snackbar';


export default {
  mixins: [snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogin']),
    async login(email, password) {
      const firebaseUser = await this.$firebaseApi
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((payload) => payload.user)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });

      await this.setLogin(firebaseUser);
    },
  },
};
