<template>
  <fragment>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndUp || showDrawer"
      @transitionend="expanded = !expanded"
      v-model="showDrawer"
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
    <v-btn
      fab
      v-show="$vuetify.breakpoint.xsOnly"
      :class="{'clip-to-drawer' : showDrawer, 'clip-to-drawer--expanded' : expanded}"
      :color="showDrawer ? 'red' : 'green'" dark fixed bottom left
      :style="{'z-index' : '1100'}"
      @click="toggleNavigationDrawer">
      <v-icon :class="{'rotate-icon' : showDrawer}">add</v-icon>
    </v-btn>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { accountItems, menuItems } from '@/config/navigation/navigationItems';
import handleNavigation from '@/mixins/navigation/handleNavigation';

export default {
  name: 'NavigationDrawer',
  mixins: [handleNavigation],
  data: () => ({
    showAccountList: false,
    accountItems,
    menuItems,
    showDrawer: true,
    expanded: false,
  }),
  computed: {
    ...mapGetters('user', ['userData']),
  },
  methods: {
    toggleNavigationDrawer() {
      this.showDrawer = !this.showDrawer;
      this.expanded = false;
    },
  },
  watch: {
    $route () {
      if (this.showDrawer) this.toggleNavigationDrawer();
    },
  },
};
</script>

<style lang="scss">
.clip-to-drawer {
  margin-left: 64px;

  &--expanded {
    margin-left: 204px;
  }
}

.rotate-icon {
  transform: rotate(45deg);
}
</style>
