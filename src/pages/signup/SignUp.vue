<template>
  <v-container>
    <v-snackbar v-model="showError" color="red" top>
      Sign up failed. Try again.
    </v-snackbar>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-toolbar class="cmf_welcome cmf_secondary">
          <v-toolbar-title>Sign Up</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex>
                <v-text-field
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  autofocus
                  @keyup.enter="signUp" />
                <v-text-field
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  @keyup.enter="signUp" />
                <v-text-field
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  @keyup.enter="signUp" />
                <v-btn color="green" dark @click="signUp">Sign Up</v-btn>
                <p class="login-info">
                  You already have an account? You can
                  <router-link to="/login">log in here</router-link>
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

export default {
  name: 'SignUpForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      showError: false,
      writeSuccessful: false,
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    async signUp() {
      try {
        await this.$firebaseApi
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((firebaserUser) => this.$firebaseApi.addUniqueUserDatabaseByUID.call(this, firebaserUser))
          .then((firebaserUser) => {
            this.login(firebaserUser);
          });
      } catch (error) {
        this.showError = true;
        this.clear();
      }
    },
    clear() {
      this.password = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.login-info {
  padding-top: 50px;
}
</style>
