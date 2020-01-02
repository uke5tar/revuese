<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6">
              <v-row v-for="(value, key, index) in loginData" :key="index">
                <v-col>
                  <v-text-field
                    class="text-capitalize"
                    dense required clearable
                    :autofocus="index === 0"
                    :type="key === 'password' && !showPassword ? 'password' : 'text'"
                    :append-icon="key === 'password' ? 'remove_red_eye' : ''"
                    @click:append="showPassword = !showPassword"
                    :label="key"
                    v-model="loginData[key]"
                    @keyup.enter="submit" />
                </v-col>
              </v-row>
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
          <v-btn
            width="200"
            color="green darken white--text"
            outlined
            @click="submit">
            Log In
          </v-btn>
          <p class="pt-12">
            You don't have an account yet? You can
            <router-link to="/signup">sign up here</router-link>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
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
