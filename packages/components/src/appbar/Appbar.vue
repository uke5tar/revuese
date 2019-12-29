<template>
  <nav>
    <v-app-bar
      app
      color="blue"
      dark
      flat
      clipped-left
      width="100%"
      data-cy="appbar">
      <router-link
        to="/"
        class="white--text no-link-style">
        <v-toolbar-title class="d-flex align-center font-italic font-weight-thin">
          <v-img
            class="fill-height"
            height="50"
            contain
            src="@/assets/img/vue-logo.png" />
          revuese
        </v-toolbar-title>
      </router-link>

      <v-spacer />
      <Title type="h1" class="font-weight-light text-capitalize">{{ pageName }}</Title>
      <v-spacer />

      <v-toolbar-items class="align-center">
        <v-btn
          v-for="item in accountItems"
          :id="item.id"
          :key="item.title"
          icon
          :title="item.title"
          @click="handleNavigation(item)"
          data-cy="appbar_nav-item">
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <slot />
  </nav>
</template>

<script>
import { pathTo } from '@/plugins/router/helper';
import { accountItems } from '@/config/navigation/navigationItems';
import handleNavigation from '@/mixins/navigation/handleNavigation';

export default {
  name: 'Appbar',
  mixins: [handleNavigation],
  data: () => ({
    accountItems,
    pathTo,
    pageName: '',
  }),
  watch: {
    $route () {
      this.pageName = this.$router.currentRoute.name;
    },
  },
};
</script>
