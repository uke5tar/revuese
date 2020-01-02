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
                dense required autofocus clearable
                type="text"
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import snackbarMethods from '@/mixins/snackbar';

export default {
  name: 'Profile',
  mixins: [snackbarMethods],
  data: () => ({
    userInformation: {
      displayName: '',
      email: '',
      password: '',
    },
    selectedId: '',
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
