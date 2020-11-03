<template>
  <v-container>
    <p>Only visible for users with role: 'guest' (default).</p>
    <p>
      Every user receives by default the role 'guest' after signup.
      If a page should be only accessible for certain roles you need to add the required role
      to the page within navigationItems.js (see guest as an example). By default every user receives
      at signup the role 'guest'.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'Guest',
};
</script>
