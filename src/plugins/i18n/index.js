import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

/*
  How to use:
  Add additional translation files to /locales and translate the keys
  Add country key to /config/languages/index.js languages array
*/

function loadLocaleMessages () {
  const locales = require.context('@/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  silentFallbackWarn: true,
  messages: loadLocaleMessages(),
});
