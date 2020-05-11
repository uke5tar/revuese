<template>
  <v-container>
    <v-row justify="center">
      <v-card width="600">
        <v-card-title>
          Login
          <span class="font-weight-light pl-2">
            | Revuese
          </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row v-for="(value, key, index) in loginData" :key="index">
              <v-col>
                <v-text-field
                  class="text-capitalize"
                  dense required clearable
                  clear-icon="clear"
                  :tabindex="index + 1"
                  :autofocus="index === 0"
                  :type="key === 'password' && !showPassword ? 'password' : 'text'"
                  :append-icon="key === 'password' ? 'remove_red_eye' : ''"
                  @click:append="showPassword = !showPassword"
                  :label="key"
                  v-model="loginData[key]"
                  @keyup.enter="submit" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                  width="200"
                  color="green darken white--text"
                  outlined
                  @click="submit">
                  Log In
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="pt-6">
              <v-col cols="12">
                Forgot password? <router-link :to="pathTo.passwordreset" class="pl-1">Reset here</router-link>
              </v-col>
              <v-col cols="12">
                You don't have an account yet?
                <router-link :to="pathTo.signup">Sign up here</router-link>
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
import login from '@/mixins/auth/login';
import snackbarMethods from '@/mixins/snackbar';

export default {
  name: 'LoginForm',
  mixins: [login, snackbarMethods],
  data: () => ({
    loginData: {
      email: '',
      password: '',
    },
    showPassword: false,
    pathTo,
  }),
  methods: {
    setFieldType(key) {
      const validInputTypes = ['text', 'email', 'password'];
      let type = validInputTypes.includes(key) ? key : 'text';
      if (this.showPassword) type = 'text';
      return type;
    },
    async submit() {
      await this.login(...Object.values(this.loginData))
        .then((success) => {
          if (success) {
            this.$router.push(pathTo.home);
          }
        })
        .catch((error) => {
          this.setSnackbarError({ text: error.message });
        });
    },
  },
};
</script>
