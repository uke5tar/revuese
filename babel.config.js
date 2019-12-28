module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@vue/cli-plugin-babel/preset',
  ];
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ];

  return {
    presets,
    plugins,
  };
};
