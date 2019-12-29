<template>
  <v-app>
    <Appbar />
    <NavigationDrawer v-if="showNavigationDrawer" />
    <v-content>
      <div style="min-height: 5px">
        <v-progress-linear v-if="loader" indeterminate color="orange" />
      </div>
      <v-container fluid>
        <vue-page-transition name="fade-in-down">
          <router-view :class="{'max-1000': $vuetify.breakpoint.lgAndDown}" />
        </vue-page-transition>
      </v-container>
    </v-content>
    <v-footer app />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Appbar from '@components/appbar';
import NavigationDrawer from '@components/navigation_drawer';
import Snackbar from '@components/snackbar';
import { pathTo } from '@/plugins/router/helper';
import apiSettings from '@/mixins/api_service/apiSettings';


export default {
  name: 'App',
  components: {
    Appbar,
    NavigationDrawer,
    Snackbar,
  },
  mixins: [apiSettings],
  computed: {
    ...mapGetters('user', ['userIsAuthenticated']),
    ...mapGetters('current', ['loader']),
    showNavigationDrawer() {
      return this.userIsAuthenticated;
    },
  },
  created() {
    this.interceptFirebaseApiResponse(this);
    // this.showLoaderOnFirebaseApiFetch(this);
  },
};
</script>


<style lang="scss">
.max-1000 {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
