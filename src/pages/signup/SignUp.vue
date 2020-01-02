<template>
  <v-container>
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
                  v-model="userName"
                  type="text"
                  placeholder="User Name"
                  autofocus
                  @keyup.enter="submit" />
                <v-text-field
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  @keyup.enter="submit" />
                <v-text-field
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  @keyup.enter="submit" />
                <v-btn
                  width="200"
                  color="green darken white--text"
                  outlined
                  @click="submit">
                  Sign Up
                </v-btn>
                <p class="pt-12">
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
import { pathTo } from '@/plugins/router/helper';
import signUp from '@/mixins/auth/signup';

export default {
  name: 'SignUpForm',
  mixins: [signUp],
  data: () => ({
    userName: '',
    email: '',
    password: '',
  }),
  methods: {
    async submit() {
      const userCanSignup = await this.signUp(this.userName, this.email, this.password);
      if (userCanSignup) {
        this.$router.push(pathTo.home);
      }
    },
  },
};
</script>
