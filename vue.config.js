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

    // webpack alias
    config.resolve.alias
      .set('@components', pathTo.components)
      .set('@styles', pathTo.styles);


    return config;
  },
  transpileDependencies: [
    'vuetify',
  ],
};
