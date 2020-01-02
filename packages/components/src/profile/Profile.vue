<template>
  <v-container>
    <v-card>
      <v-card-title>Profile</v-card-title>
      <v-card-subtitle>Update user information</v-card-subtitle>
      <v-card-text>
        <v-form class="pb-12">
          <v-row v-for="(value, key, index) in userInformation" :key="index">
            <v-col cols="6">
              <v-text-field
                class="text-capitalize"
                dense required clearable
                :autofocus="index === 0"
                :type="key === 'password' && !showPassword ? 'password' : 'text'"
                :append-icon="key === 'password' ? 'remove_red_eye' : ''"
                @click:append="showPassword = !showPassword"
                :label="key"
                :disabled="!isSelected(index)"
                v-model="userInformation[key]" />
            </v-col>
            <v-col cols="3">
              <v-btn
                width="200"
                outlined
                :color="!isSelected(index) ? 'orange darken white--text' : 'red darken white--text'"
                @click="toggleEdit(index)">
                <v-icon left>
                  {{ !isSelected(index) ? 'edit' : 'clear' }}
                </v-icon>
                {{ !isSelected(index) ? 'Edit' : 'Cancel' }}
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                width="200"
                color="green darken white--text"
                outlined
                @click="updateUserInformation">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <Modal
      headline="Reauthenticaten required"
      save-btn-name="Reauthenticate"
      :show-modal="showModal"
      @save="logout"
      @cancel="showModal = false">
      {{ reauthenticationMessage }}
    </Modal>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '@components/modal';
import snackbarMethods from '@/mixins/snackbar';
import logout from '@/mixins/auth/logout';


export default {
  name: 'Profile',
  components: {
    Modal,
  },
  mixins: [logout, snackbarMethods],
  data: () => ({
    userInformation: {
      displayName: '',
      email: '',
      password: '',
    },
    selectedId: '',
    showModal: false,
    showPassword: false,
    reauthenticationMessage: '',
  }),
  computed: {
    ...mapGetters('user', ['userData']),
  },
  methods: {
    toggleEdit(index) {
      this.selectedId = this.selectedId !== index ? index : '';
    },
    isSelected(index) {
      return this.selectedId === index;
    },
    updateUserInformation() {
      const { currentUser } = this.$firebaseApi.auth();
      const { userData, userInformation } = this;

      if (userData.displayName !== userInformation.displayName) {
        currentUser.updateProfile({ displayName: userInformation.displayName })
          .then(() => {
            this.setSnackbarSuccess({ text: 'Display name successfully updated' });
            this.selectedId = '';
          })
          .catch((error) => {
            this.setSnackbarError({ text: error.message });
          });
      }

      if (userData.email !== userInformation.email) {
        currentUser.updateEmail(userInformation.email)
          .then(() => {
            this.setSnackbarSuccess({ text: 'Email successfully updated' });
            this.selectedId = '';
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login') {
              this.reauthenticationMessage = error.message;
              this.showModal = true;
            }
          });
      }

      if (userInformation.password !== '') {
        currentUser
          .updatePassword(userInformation.password)
          .then(() => {
            this.setSnackbarSuccess({ text: 'Email successfully updated' });
            this.selectedId = '';
          })
          .catch((error) => {
            this.setSnackbarError({ text: error.message });
          });
      }
    },
    async getUserInformation() {
      const user = this.userData;
      const { uid } = user;

      const hasUserTable = await this.$firebaseApi.firestore().collection('users').doc(uid).get()
        .then((doc) => doc.exists)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });
      if (hasUserTable) {
        Object.keys(user).forEach((key, value) => {
          const hasKeys = [this.userInformation, user].every((item) => Object.prototype.hasOwnProperty.call(item, key));
          if (hasKeys) this.userInformation[key] = user[key];
        });
      }
    },
  },
  created() {
    this.getUserInformation();
  },
};
</script>

<style>

</style>
