// eslint-disable-next-line import/no-extraneous-dependencies
const pathTo = require('./filepath.config');


module.exports = {
  chainWebpack: (config) => {
    // sass/scss loader
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: pathTo.globalSassFiles,
        })
        .end();
    });

    // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end();

    // webpack alias
    config.resolve.alias
      .set('@components', pathTo.components)
      .set('@styles', pathTo.styles)
      .set('@locales', pathTo.locales);


    return config;
  },
  transpileDependencies: [
    'vuetify',
  ],
};
