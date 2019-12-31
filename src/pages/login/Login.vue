<template>
  <v-container>
    <v-snackbar v-model="showError" color="red" top>
      Login failed. Try again.
    </v-snackbar>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-toolbar class="cmf_welcome cmf_secondary">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex>
                <v-text-field
                  v-model="email"
                  type="text"
                  placeholder="Email"
                  autofocus
                  @keyup.enter="submit" />
                <v-text-field
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  @keyup.enter="submit" />
                <v-btn color="green" dark @click="submit">Log In</v-btn>
                <p class="signup-info">
                  You don't have an account yet? You can
                  <router-link to="/signup">sign up here</router-link>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { pathTo } from '@/plugins/router/helper';
import snackbarMethods from '@/mixins/snackbar';


export default {
  name: 'LoginForm',
  mixins: [snackbarMethods],
  data() {
    return {
      email: '',
      password: '',
      showError: false,
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    async submit() {
      await this.$firebaseApi
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (payload) => {
          if (payload) {
            const { user } = payload;
            await this.login(user).catch((error) => console.error(error));
            this.$router.push(pathTo.signup);
          }
        })
        .catch((error) => {
          this.email = '';
          this.password = '';
          this.setSnackbarError({ text: error.message });
        });
    },
    clear() {
      this.password = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-info {
  padding-top: 50px;
}
</style>
