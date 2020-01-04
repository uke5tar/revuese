import { mapActions } from 'vuex';
import addUserDatabase from '@/mixins/firestore/users/addUserDatabase';
import snackbarMethods from '@/mixins/snackbar';

export default {
  mixins: [addUserDatabase, snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogin']),
    async signUp(userName, email, password) {
      const firebaseUser = await this.$fireauth
        .createUserWithEmailAndPassword(email, password)
        .then((payload) => payload)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });

      if (firebaseUser) {
        const { user } = firebaseUser;
        await user.updateProfile({ displayName: userName });
        await this.addUserDatabase({ userName: user.displayName });
        await this.setLogin(user);

        return true;
      }
      return false;
    },
  },
};
