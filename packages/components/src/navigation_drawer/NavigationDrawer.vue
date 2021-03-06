<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndUp || showDrawer"
    v-click-outside="() => setShowDrawer(false)"
    :value="showDrawer"
    :expand-on-hover="$vuetify.breakpoint.smAndUp"
    :temporary="$vuetify.breakpoint.xs"
    permanent
    app
    left
    clipped
    width="220">
    <template v-slot:prepend>
      <v-list v-if="userIsAuthenticated">
        <v-list-item
          link two-line
          @click="showAccountList = !showAccountList">
          <v-list-item-content>
            <v-list-item-title class="title text-capitalize">
              {{ userData.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ userData.email }}</span>
              <v-icon right>
                {{ showAccountList ? 'expand_less' : 'expand_more' }}
              </v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in accountItems"
          v-show="showAccountList"
          :id="item.id"
          :key="item.title"
          class="navigation_drawer__account-list"
          :prepend-icon="item.icon"
          link
          @click="handleNavigation(item)"
          data-cy="navigationdrawer_nav-item">
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              {{ $t(`navigation.${item.title.toLowerCase()}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <v-divider />

    <v-list nav dense>
      <v-list-item
        v-for="item in filterNavigationItems(menuItems)"
        :key="item.title"
        :to="item.path" link>
        <v-list-item-action>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{ $t(`navigation.${item.title.toLowerCase()}`) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list nav dense>
      <v-list nav dense style="position: absolute; bottom: 0;">
        <v-list-item
          v-for="item in additionalItems"
          :key="item.title"
          :to="item.path" link>
          <v-list-item-action>
            <v-icon class="grey--text">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-1">
              {{ $t(`navigation.${item.title.toLowerCase()}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { accountItems, menuItems, additionalItems } from '@/config/navigation/navigationItems';
import handleNavigation from '@/mixins/navigation/handleNavigation';

export default {
  name: 'NavigationDrawer',
  mixins: [handleNavigation],
  data: () => ({
    showAccountList: false,
    accountItems,
    menuItems,
    additionalItems,
  }),
  computed: {
    ...mapGetters('user', ['userData', 'userIsAuthenticated']),
    ...mapGetters('current', ['showDrawer']),
  },
  methods: {
    ...mapActions('current', ['setShowDrawer']),

    filterNavigationItems(navigationItems) {
      const filterByUserRole = (() => navigationItems.filter((item) => {
        if (!item.role || item.role === this.userData.role) {
          return true;
        }
        return false;
      }))();

      const filterByAuthStatus = (() => navigationItems.filter((item) => {
        if (!item.auth || item.auth === this.userIsAuthenticated) {
          return true;
        }
        return false;
      }))();

      return filterByUserRole && filterByAuthStatus;
    },
  },
  watch: {
    $route () {
      if (this.showDrawer) this.setShowDrawer(!this.showDrawer);
    },
  },
};
</script>
