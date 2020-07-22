<template>
  <cookie-law
    theme="dark-lime"
    storage-type="cookies"
    :message="$t('cookiebanner.message')"
    :button-text="$t('cookiebanner.button')" />
</template>

<script>
import CookieLaw from 'vue-cookie-law';

export default {
  name: 'CookieBanner',
  components: {
    CookieLaw,
  },
};
</script>
