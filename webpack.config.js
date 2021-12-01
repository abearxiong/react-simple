// @ts-check
// @ts-ignore
const pkgs = require('./package.json');

const path = require('path');
const join = path.join;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const WEBPACK_SERVE = process.env.WEBPACK_SERVE;
const WEBPACK_DEV_TYPE = process.env.WEBPACK_DEV_TYPE;
const mode = WEBPACK_SERVE ? 'development' : 'prodution';

const common = {
  target: 'web',
  mode: mode,
  entry: './src/index.tsx',
  optimization: {
    runtimeChunk: 'single'
  },
  output: {
    publicPath: `/`,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|gif|bmp)/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开发环境下开启 babel 缓存
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      cache: true,
      version: pkgs.version,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx}',
      },
    }),
    // @ts-ignore
    new ESLintPlugin({
      fix: true,
    }),
    // @ts-ignore
    new WebpackBuildNotifierPlugin({
      title: pkgs.name,
      suppressSuccess: true,
    }),

    new webpack.DefinePlugin({
      WEBPACK_SERVE: JSON.stringify(WEBPACK_SERVE),
      WEBPACK_DEV_TYPE: JSON.stringify(WEBPACK_DEV_TYPE),
      APP_NAME: JSON.stringify(pkgs.name.split('/')[1]),
    }),
  ],
};

module.exports = merge(common)