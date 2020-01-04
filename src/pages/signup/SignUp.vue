<template>
  <v-container>
    <v-card>
      <v-card-title>Sign up</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6">
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
            Sign up
          </v-btn>
          <p class="pt-12">
            You already have an account? You can
            <router-link :to="pathTo.login">log in here</router-link>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
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
