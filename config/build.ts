import TerserPlugin from 'terser-webpack-plugin';
import { WebpackConfiguration } from './type';

/**
 * terser plugin
 * @param config
 */
export const addTerser = (config: WebpackConfiguration) => {
  config.optimization = config.optimization || {};
  config.optimization.minimizer = config.optimization.minimizer || [];

  config.optimization.minimizer.push(
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
        compress: {
          // drop_console: true,
          drop_debugger: true,
        },
      },
      extractComments: false, // 不将注释提取到单独的文件中
    }),
  );
};
