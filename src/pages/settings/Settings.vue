<template>
  <v-container>
    <v-card>
      <v-card-title center>{{ $t('settings.settings') }}</v-card-title>
      <v-card-text>
        <v-select
          :label="$t('settings.language')"
          v-model="language"
          @change="setLanguage"
          :items="languages" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import defaults from '@/config/defaults';
import updateDataFrom from '@/mixins/firestore/updateDataFrom';
import { USERS } from '@/config/firestore';

export default {
  name: 'Settings',
  mixins: [updateDataFrom],
  data: () => ({
    language: '',
    languages: defaults.languages,
  }),
  computed: {
    ...mapGetters('user', ['userData']),
  },
  methods: {
    ...mapActions('user', ['setUserLanguage']),
    setLanguage() {
      this.$i18n.locale = this.language;
      this.updateDataFrom(USERS, { language: this.language });
      this.setUserLanguage(this.language);
    },
  },
  created() {
    this.language = this.userData.language;
  },
};
</script>
