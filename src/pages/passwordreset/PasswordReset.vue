<template>
  <v-container>
    <v-row justify="center">
      <v-card width="600">
        <v-card-title>
          {{ $t('passwordReset.passwordReset') }}
          <span class="font-weight-light pl-2">
            | Revuese
          </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field
                  dense required clearable
                  clear-icon="clear"
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
                  {{ $t('passwordReset.resetPassword') }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="pt-6">
              <v-col>
                {{ $t('passwordReset.noPasswordChange') }}? <router-link :to="pathTo.login" class="pl-1">
                  {{ $t('passwordReset.backToLogin') }}
                </router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
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
          this.setSnackbarSuccess({ text: this.$t('passwordReset.passwordResetEmailSend') });
          this.$router.push(pathTo.login);
        })
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });
    },
  },
};
</script>
