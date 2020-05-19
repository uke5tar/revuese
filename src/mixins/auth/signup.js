import { mapActions } from 'vuex';
import addDatabase from '@/mixins/firestore/addDatabase';
import { USERS } from '@/config/firestore';
import snackbarMethods from '@/mixins/snackbar';

export default {
  mixins: [addDatabase, snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogin']),

    async signUp(displayName, email, password) {
      const firebaseUser = await this.$fireauth
        .createUserWithEmailAndPassword(email, password)
        .then((payload) => payload)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });

      if (firebaseUser) {
        const { user } = firebaseUser;
        await user.updateProfile({ displayName });
        await this.setLogin(user);
        await this.addDatabase(USERS, { displayName: user.displayName });

        return true;
      }
      return false;
    },
  },
};
