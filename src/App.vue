<template>
  <v-app>
    <Appbar />
    <NavigationDrawer />
    <v-main>
      <Loader :show="loader" />
      <v-container fluid>
        <vue-page-transition name="fade-in-down">
          <router-view :class="{'max-1000': $vuetify.breakpoint.lgAndDown}" />
        </vue-page-transition>
      </v-container>
    </v-main>
    <v-footer app />
    <Cookiebanner />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Appbar from '@components/appbar';
import NavigationDrawer from '@components/navigation_drawer';
import Loader from '@components/loader';
import Cookiebanner from '@components/cookiebanner';
import Snackbar from '@components/snackbar';
import loaderMethods from '@/mixins/loader';
import availableLanguages from '@/config/languages';

export default {
  name: 'App',
  components: {
    Appbar,
    NavigationDrawer,
    Loader,
    Cookiebanner,
    Snackbar,
  },
  data: () => ({
    availableLanguages,
  }),
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['appLanguage']),
    ...mapGetters('current', ['loader']),
  },
  methods: {
    initAppLanguage() {
      if (this.appLanguage) {
        this.$i18n.locale = this.appLanguage;
      } else {
        const browserLanguage = (window.navigator.userLanguage || window.navigator.language).slice(0, 2);
        this.$i18n.locale = availableLanguages.includes(browserLanguage) ? browserLanguage : 'en';
      }
    },
  },
  created() {
    this.initAppLanguage();
    // reset loader if wrongly state has been stored accidentally
    this.hideLoader(0);
  },
};
</script>


<style lang="scss">
.max-1000 {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
