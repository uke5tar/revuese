<template>
  <v-container>
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
import { pathTo } from '@/plugins/router/helper';
import login from '@/mixins/auth/login';

export default {
  name: 'LoginForm',
  mixins: [login],
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async submit() {
      const userCanLogin = await this.login(this.email, this.password);
      if (userCanLogin) {
        this.$router.push(pathTo.home);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-info {
  padding-top: 50px;
}
</style>
