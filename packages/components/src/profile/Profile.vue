<template>
  <v-container>
    <v-card>
      <v-card-title>Profile</v-card-title>
      <v-card-text>
        <v-form class="pb-12">
          <v-row v-for="(value, key, index) in localUserData" :key="index" class="pt-8">
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                class="text-capitalize"
                dense required clearable
                clear-icon="clear"
                :autofocus="index === 0"
                :type="key === 'password' && !showPassword ? 'password' : 'text'"
                :append-icon="key === 'password' ? 'remove_red_eye' : ''"
                @click:append="showPassword = !showPassword"
                :label="key"
                :disabled="!isSelected(index)"
                v-model="localUserData[key]" />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-row>
                <v-col cols="12" sm="6">
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
                <v-col cols="12" sm="6">
                  <v-btn
                    width="200"
                    color="green darken white--text"
                    outlined
                    @click="updateLocalUserData">
                    Save
                  </v-btn>
                </v-col>
              </v-row>
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
import { mapGetters, mapActions } from 'vuex';
import Modal from '@components/modal';
import snackbarMethods from '@/mixins/snackbar';
import logout from '@/mixins/auth/logout';
import loaderMethods from '@/mixins/loader';
import updateUserDatabase from '@/mixins/firestore/users/updateUserDatabase';

export default {
  name: 'Profile',
  components: {
    Modal,
  },
  mixins: [logout, loaderMethods, updateUserDatabase, snackbarMethods],
  data: () => ({
    localUserData: {
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
    ...mapActions('user', ['setUserData']),
    toggleEdit(index) {
      this.selectedId = this.selectedId !== index ? index : '';
    },
    isSelected(index) {
      return this.selectedId === index;
    },
    updateLocalUserData() {
      const { currentUser } = this.$fireauth;
      const { userData, localUserData } = this;

      if (userData.displayName !== localUserData.displayName) {
        currentUser.updateProfile({ displayName: localUserData.displayName })
          .then(() => {
            this.setUserData({ displayName: localUserData.displayName });
            this.updateUserDatabase({ displayName: localUserData.displayName });
            this.selectedId = '';
            this.setSnackbarSuccess({ text: 'Display name successfully updated' });
          })
          .catch((error) => {
            this.setSnackbarError({ text: error.message });
          });
      }

      if (userData.email !== localUserData.email) {
        currentUser.updateEmail(localUserData.email)
          .then(() => {
            this.setUserData({ email: localUserData.email });
            this.selectedId = '';
            this.setSnackbarSuccess({ text: 'Email successfully updated' });
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login') {
              this.reauthenticationMessage = error.message;
              this.showModal = true;
            }
          });
      }

      if (localUserData.password !== '') {
        currentUser
          .updatePassword(localUserData.password)
          .then(() => {
            this.setSnackbarSuccess({ text: 'Userdata successfully updated' });
            this.selectedId = '';
          })
          .catch((error) => {
            this.setSnackbarError({ text: error.message });
          });
      }
    },
    async getLocalUserData() {
      this.showLoader();

      const user = this.userData;
      const hasUserTable = await this.$firestore.collection('users').doc(user.uid).get()
        .then((doc) => doc.exists)
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });

      if (hasUserTable) {
        Object.keys(user).forEach((key) => {
          const hasKeys = [this.localUserData, user].every((item) => Object.prototype.hasOwnProperty.call(item, key));
          if (hasKeys) this.localUserData[key] = user[key];
        });
      }

      this.hideLoader();
    },
  },
  created() {
    this.getLocalUserData();
  },
};
</script>

<style>

</style>
