<template>
  <v-container>
    <Title type="h2" class="font-weight-thin">
      {{ $t('language.appLanguage') }}
    </Title>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          :label="$t('language.appLanguage')"
          :items="availableLanguageNames"
          v-model="localAppLanguage"
          @change="updateAppLanguage"
          :hint="$t('language.appLanguageHint')"
          persistent-hint
          outlined />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import availableLanguages from '@/config/languages';
import updateDataFrom from '@/mixins/firestore/updateDataFrom';
import { USERS } from '@/config/firestore';

export default {
  name: 'Language',
  data: () => ({
    localAppLanguage: '',
  }),
  mixins: [updateDataFrom],
  computed: {
    ...mapGetters('user', ['appLanguage']),

    availableLanguageNames() {
      return availableLanguages.map((code) => this.$lang.getNativeName(code));
    },
  },
  methods: {
    ...mapActions('user', ['setAppLanguage']),

    async updateAppLanguage() {
      const languageCode = this.$lang.getCode(this.localAppLanguage);
      this.$i18n.locale = languageCode;

      this.setAppLanguage(languageCode);

      await this.updateDataFrom(USERS, { appLanguage: languageCode });
    },
    initLanguageData() {
      if (this.appLanguage) {
        this.localAppLanguage = this.$lang.getNativeName(this.appLanguage);
      } else {
        const browserLanguage = (window.navigator.userLanguage || window.navigator.language).slice(0, 2);
        this.localAppLanguage = availableLanguages.includes(browserLanguage)
          ? this.$lang.getNativeName(browserLanguage)
          : this.$lang.getNativeName('en');
      }
    },
  },
  created() {
    this.initLanguageData();
  },
};
</script>
