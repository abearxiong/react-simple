import { WebpackConfiguration } from './type';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { checkDev } from './dev-server';

/**
 * add sass loader
 * @param config
 */
export const sassLoader = (config: WebpackConfiguration) => {
  const dev = checkDev();
  const _l = {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: !dev ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: dev,
          /**
           * if use modules, set scss filename moduelName.module.scss,
           * if not use module, set scss filename moduleName.scss
           */
          modules: true, // 此处设置为false可禁用局部CSS
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: () => {
              return ['postcss-preset-env'];
            },
          },
        },
      },
      'sass-loader',
    ],
  };
  if (!config.module) {
    config.module = {
      rules: [],
    };
  }
  config.module.rules = config.module?.rules || [];
  config.module.rules.push(_l);
};

/**
 * production need add sass Plugin
 * @param config
 * @returns
 */
export const sassPlugin = (config: WebpackConfiguration) => {
  if (checkDev()) return;
  const mp = new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css',
  });

  config.plugins?.push?.(mp);
};
