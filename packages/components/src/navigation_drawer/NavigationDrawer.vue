<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    app
    left
    clipped
    width="220">
    <template v-slot:prepend>
      <v-list>
        <v-list-item
          link two-line
          @click="toggleAccountList">
          <v-list-item-content>
            <v-list-item-title class="title text-capitalize">
              {{ userData.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ userData.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>
              mdi-menu-down
            </v-icon>
          </v-list-item-action>
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
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <v-divider />

    <v-list nav dense>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
        <v-list-item-action>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { pathTo } from '@/plugins/router/helper';
import { accountItems, menuItems } from '@/config/navigation/navigationItems';
import handleNavigation from '@/mixins/navigation/handleNavigation';

export default {
  name: 'NavigationDrawer',
  mixins: [handleNavigation],
  data: () => ({
    showAccountList: false,
    accountItems,
    menuItems,
  }),
  computed: {
    ...mapGetters('user', ['userData']),
  },
  methods: {
    toggleAccountList() {
      this.showAccountList = !this.showAccountList;
    },
  },
};
</script>
