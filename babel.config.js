const path = require('path');
module.exports = (api) => {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.ENV);
  // const development = process.env.ENV === 'development';
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          modules: false,
          corejs: 3,
        },
      ],
      '@babel/preset-react',
      // '@babel/preset-typescript'
    ],
    plugins: [
      // ['@babel/plugin-proposal-decorators', { legacy: true }],
      // ['@babel/plugin-proposal-class-properties', { loose: true }],
      // '@babel/plugin-proposal-export-default-from',
      // '@babel/plugin-transform-typescript'
    ].filter(Boolean),
  };
};
