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
      <v-btn
        text
        rounded
        color="white"
        v-if="$vuetify.breakpoint.xs"
        @click="setShowDrawer(!showDrawer)">
        <v-icon :class="{'rotate-icon' : showDrawer}">{{ showDrawer ? 'clear' : 'menu' }}</v-icon>
      </v-btn>
      <router-link
        to="/"
        class="white--text no-link-style">
        <v-toolbar-title class="d-flex align-center font-italic font-weight-thin">
          <v-img
            v-if="$vuetify.breakpoint.smAndUp"
            class="fill-height"
            height="40"
            contain
            src="@/assets/img/vue-logo.png" />
          <span v-show="$vuetify.breakpoint.smAndUp">revuese</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer />
      <Title type="h1" class="font-weight-light text-capitalize">{{ pageName }}</Title>
      <v-spacer />

      <v-toolbar-items class="align-center" v-if="$vuetify.breakpoint.smAndUp">
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

      <v-menu v-else bottom offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in accountItems"
            :id="item.id"
            :key="item.title"
            @click="handleNavigation(item)"
            data-cy="appbar_nav-item">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <slot />
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  computed: {
    ...mapGetters('current', ['showDrawer']),
  },
  methods: {
    ...mapActions('current', ['setShowDrawer']),
  },
  watch: {
    $route () {
      this.pageName = this.$router.currentRoute.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-icon {
  transition: transform .4s ease;
  transform: rotate(90deg);
}
</style>
