import * as path from 'path';
import * as pkgs from './package.json';
import { addPlugin, analyzerPlugin, eslintPlugin, htmlPlugin, tsCheckPlugin } from './config/plugins';

const WEBPACK_SERVE = Boolean(process.env.WEBPACK_SERVE);
const join = path.join;
const mode = WEBPACK_SERVE ? 'development' : 'production';
const isDev = mode === 'development';

import { addDevServer } from './config/dev-server';
import { sassLoader, sassPlugin, WebpackConfiguration } from './config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as webpack from 'webpack';
import { ProxyConfigMap } from 'webpack-dev-server';

const config: WebpackConfiguration = {
  target: 'web',
  mode: mode,
  entry: './src/index.tsx',
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  output: {
    publicPath: `/`,
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 在生成文件之前清空 output 目录
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
        test: /\.css$/,
        use: [
          {
            loader: !isDev ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: () => {
          //         return ['postcss-preset-env', 'postcss-nesting', 'tailwindcss/nesting', 'tailwindcss', 'autoprefixer'];
          //       },
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules\/(?!.*@abearxiong)/,
        options: {
          loader: 'tsx', // Remove this if you're not using JSX
          target: 'es2015', // Syntax to compile to (see options below for possible values)
          // tsconfigRaw: require(path.resolve('./tsconfig.json',),),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_SERVER: JSON.stringify(isDev),
      DEV_TIME: JSON.stringify(new Date().toLocaleString()),
    }),
    new webpack.ProgressPlugin(),
  ],
};

const proxy: ProxyConfigMap = {
  '/api': {
    target: 'https://test.ai/',
    pathRewrite: { '^/api': '/api' },
    ws: true,
    changeOrigin: true,
    logLevel: 'debug',
  },
};
addDevServer(config, { proxy });

sassLoader(config);
sassPlugin(config);

addPlugin(config, htmlPlugin({ version: pkgs.version, title: 'Simple Demo' }));
sassPlugin(config);
tsCheckPlugin(config);
eslintPlugin(config);

analyzerPlugin(config);

module.exports = config;
