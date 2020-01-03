<template>
  <v-container>
    <v-card>
      <v-card-title>Password Reset</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense required clearable
                autofocus
                type="email"
                label="Email"
                v-model="email"
                @keyup.enter="submit" />
              <v-btn
                class="mt-6"
                width="200"
                color="green darken white--text"
                outlined
                @click="passwordReset">
                Reset Password
              </v-btn>
              <p class="pt-12">
                Don't want to change password?
                <router-link :to="pathTo.login">Back to login</router-link>
              </p>
            </v-col>
            <v-col cols="6" align="center">
              <v-img
                class="fill-height"
                height="125"
                contain
                src="@/assets/img/vue-logo.png" />
              <span class="subtitle-1 font-weight-bold">Revuese</span>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { pathTo } from '@/plugins/router/helper';
import snackbarMethods from '@/mixins/snackbar';

export default {
  name: 'PasswordReset',
  mixins: [snackbarMethods],
  data: () => ({
    email: '',
    pathTo,
  }),
  methods: {
    passwordReset() {
      this.$fireauth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.setSnackbarSuccess({ text: 'Password reset email send' });
          this.$router.push(pathTo.login);
        })
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });
    },
  },
};
</script>
