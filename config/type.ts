import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
export type WebpackConfiguration = Configuration & { devServer?: DevServerConfiguration };
