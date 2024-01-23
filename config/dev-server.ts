import type Webpack from 'webpack';
import * as path from 'path';

// webpack 'dev server' does not exist in type 'configuration' so it has need to use Webpack-dev-server.Configuration

/**
 * addDevServer
 * @param config
 * @param devServer
 * @returns
 */
export const addDevServer = (config: Webpack.Configuration, devServer?: Webpack.Configuration['devServer']) => {
  if (!checkDev()) return config;
  config.devServer = {
    static: [
      {
        directory: path.join(__dirname, '../public'),
        watch: false,
      },
    ],
    compress: true,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 8080,
    client: {
      overlay: true,
      logging: 'info',
    },
    open: true,
    ...config.devServer,
    ...devServer,
  };
  return config;
};

/**
 * check promcess.env.WEBPACK_SERVE is dev
 * @returns
 */
export const checkDev = () => {
  const WEBPACK_SERVE = Boolean(process.env.WEBPACK_SERVE);
  const mode = WEBPACK_SERVE ? 'development' : 'production';
  const isDev = mode === 'development';
  return isDev;
};

export const getCommit = () => {
  if (checkDev()) return '';
  const child_process = require('child_process');
  const res = child_process.execSync('git rev-parse --short HEAD');
  return res.toString();
};
