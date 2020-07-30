<template>
  <div>
    <p>Only visible for logged in users (authenticated).</p>
    <p>
      The app is by default not behind a login-wall.
      Routes that require authentication need to be added to 'pagesRequireAuth'
      within helper.js.
      If the page should additionally appear within the menu they require the
      attribute 'auth: true' (see authenticated within navigationItems.js).
    </p>
  </div>
</template>

<script>
export default {
  name: 'Authenticated',
};
</script>
