<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndUp || showDrawer"
    v-on-clickaway="() => setShowDrawer(false)"
    :value="showDrawer"
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
          @click="showAccountList = !showAccountList">
          <v-list-item-content>
            <v-list-item-title class="title text-capitalize">
              {{ userData.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ userData.email }}
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
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
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
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { directive as onClickaway } from 'vue-clickaway2';
import { accountItems, menuItems } from '@/config/navigation/navigationItems';
import handleNavigation from '@/mixins/navigation/handleNavigation';

export default {
  name: 'NavigationDrawer',
  directives: {
    onClickaway,
  },
  mixins: [handleNavigation],
  data: () => ({
    showAccountList: false,
    accountItems,
    menuItems,
  }),
  computed: {
    ...mapGetters('user', ['userData']),
    ...mapGetters('current', ['showDrawer']),
  },
  methods: {
    ...mapActions('current', ['setShowDrawer']),
  },
  watch: {
    $route () {
      if (this.showDrawer) this.setShowDrawer(!this.showDrawer);
    },
  },
};
</script>
