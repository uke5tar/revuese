<template>
  <v-app>
    <Appbar v-if="userIsAuthenticated" />
    <NavigationDrawer v-if="showNavigationDrawer" />
    <v-content>
      <Loader :show="loader" />
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
import Loader from '@components/loader';
import Snackbar from '@components/snackbar';
import { pathTo } from '@/plugins/router/helper';

export default {
  name: 'App',
  components: {
    Appbar,
    NavigationDrawer,
    Loader,
    Snackbar,
  },
  computed: {
    ...mapGetters('user', ['userIsAuthenticated']),
    ...mapGetters('current', ['loader']),
    showNavigationDrawer() {
      return this.userIsAuthenticated;
    },
  },
};
</script>


<style lang="scss">
.max-1000 {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
