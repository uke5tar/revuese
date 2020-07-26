import { mapActions } from 'vuex';
import addNamedCollection from '@/mixins/firestore/addNamedCollection';
import { USERS } from '@/config/firestore';
import snackbarMethods from '@/mixins/snackbar';

export default {
  mixins: [addNamedCollection, snackbarMethods],
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
        await user.updateProfile({ userName });
        await this.setLogin(user);
        await this.addNamedCollection(USERS, { userName: user.userName });

        return true;
      }
      return false;
    },
  },
};
