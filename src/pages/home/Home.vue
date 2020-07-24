<template>
  <v-container>
    <v-card>
      <v-card-title center>{{ $t('navigation.home') }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { USERS } from '@/config/firestore';
import getDataFrom from '@/mixins/firestore/getDataFrom';


export default {
  name: 'Home',
  mixins: [getDataFrom],
  computed: {
    ...mapGetters('user', ['userIsAuthenticated']),
  },
  methods: {
    ...mapActions('user', ['setAppLanguage']),

    async getUserLanguageFromDb() {
      const userData = await this.getDataFrom(USERS);
      const { appLanguage } = userData;

      this.setAppLanguage(appLanguage || 'en');
      this.$i18n.locale = appLanguage;
    },
  },
  async created() {
    if (this.userIsAuthenticated) {
      await this.getUserLanguageFromDb();
    }
  },
};
</script>
