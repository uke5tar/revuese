// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  src: resolve('src'),
  components: resolve('packages/components/src'),
  styles: resolve('src/assets/scss'),
  globalSassFiles: [
    resolve('src/assets/scss/styleguide.scss'),
    resolve('src/assets/scss/global.scss'),
  ],
};
