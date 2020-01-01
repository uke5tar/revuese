import { mapActions } from 'vuex';
import snackbarMethods from '@/mixins/snackbar';


export default {
  mixins: [snackbarMethods],
  methods: {
    ...mapActions('user', ['setLogin']),
    async signUp(email, password) {
      await this.$firebaseApi
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((firebaserUser) => this.$firebaseApi.addUniqueUserDatabaseByUID.call(this, firebaserUser))
        .then((firebaserUser) => {
          this.setLogin(firebaserUser);
        })
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });
    },
  },
};
