<template>
  <v-container>
    <v-row justify="center">
      <v-card width="600">
        <v-card-title>
          Sign up
          <span class="font-weight-light pl-2">
            | Revuese
          </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row v-for="(value, key, index) in signupData" :key="index">
              <v-col>
                <v-text-field
                  class="text-capitalize"
                  dense required clearable
                  :autofocus="index === 0"
                  :type="setFieldType(key)"
                  :append-icon="key === 'password' ? 'remove_red_eye' : ''"
                  @click:append="showPassword = !showPassword"
                  :label="key | formatName"
                  v-model="signupData[key]"
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
                  Sign up
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="pt-0 pt-sm-6">
              <v-col>
                You already have an account?
                <router-link :to="pathTo.login">Log in here</router-link>
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
import signUp from '@/mixins/auth/signup';

export default {
  name: 'SignUpForm',
  mixins: [signUp],
  data: () => ({
    signupData: {
      displayName: '',
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
      await this.signUp(...Object.values(this.signupData))
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
  filters: {
    formatName(name) {
      const splitUppercase = name.toString().split(/(?=[A-Z])/).join(' ');
      return splitUppercase.toLowerCase();
    },
  },
};
</script>
