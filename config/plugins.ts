import type Webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import * as webpack from 'webpack';
import * as pkgs from '../package.json';

import { checkDev } from './dev-server';
import { WebpackConfiguration } from './type';
const { ModuleFederationPlugin } = webpack.container;
type ModuleFederationPluginOptions = webpack.container.ModuleFederationPluginOptions; // to fix webpack export is not ok
/**
 * add plugin to webpack config
 * @param config
 * @param plugin
 * @returns
 */
export const addPlugin = (config: Webpack.Configuration, plugin: any) => {
  config.plugins = config.plugins || [];
  config.plugins.push(plugin);
  return config;
};

/**
 * add html plugin HtmlWebpackPlugin
 * @param options
 * @returns
 */
export const htmlPlugin = (options?: HtmlWebpackPlugin.Options) => {
  const { title = 'demo', buildTime = new Date().toUTCString(), version, ...rest } = options || {};
  return new HtmlWebpackPlugin({
    templateContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="viewport" content="viewport-fit=cover" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>
    </head>
    <body>
      <noscript> You need to enable JavaScript to run this app. </noscript>
      <div id="root"></div>
      <div style="display:none">
        ${version} <br />
        ${buildTime}
      </div>
    </body>
    </html>
`,
    title: 'demo',
    buildTime: new Date().toUTCString(),
    cache: true,
    ...options,
  });
};

/**
 * analyzer builded size plugin
 * @param config
 * @param options
 * @returns
 */
export const analyzerPlugin = (config: Webpack.Configuration, options?: BundleAnalyzerPlugin.Options) => {
  if (checkDev()) return config;
  config.plugins = config.plugins || [];
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static', ...options }) as any);
  return config;
};
/**
 * analyzer spped plugin
 * @deprecated this plugin is not updated for a long time
 * @param config
 * @returns
 */
export const speedPlugin = (config: Webpack.Configuration) => {
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
  const smp = new SpeedMeasurePlugin();
  return smp.wrap(config as any);
};

/**
 * ts check plugin
 * @param config
 * @returns
 */
export const tsCheckPlugin = (config: WebpackConfiguration) => {
  config.plugins = config.plugins || [];
  config.plugins.push(new ForkTsCheckerWebpackPlugin());
  return config;
};

/**
 * eslint plugin
 * @param config
 * @returns
 */
export const eslintPlugin = (config: WebpackConfiguration) => {
  config.plugins = config.plugins || [];
  config.plugins.push(new ESLintPlugin({ fix: true, extensions: ['ts', 'tsx'], lintDirtyModulesOnly: true, quiet: true }));
  return config;
};

export const federationPlugin = (config: WebpackConfiguration, options?: ModuleFederationPluginOptions) => {
  config.plugins = config.plugins || [];
  const { remotes, exposes, shared, ...rest } = options || {};
  config.plugins.push(
    new ModuleFederationPlugin({
      name: pkgs?.name?.split?.('/')?.[1] || 'app',
      filename: 'remoteEntry.js',
      remotes,
      exposes,
      shared: {
        react: {
          eager: true, // 共享依赖是否被打包进入main，remoteEntry当中
          singleton: true, // 是否开启单例模式，默认为false，开启后remote组建和host应用共享同一个react实例，只加载一次。
        },
        'react-dom': {
          eager: true,
        },
        ...shared,
      },
      // other options like shared
      ...rest,
    }),
  );
  return config;
};
