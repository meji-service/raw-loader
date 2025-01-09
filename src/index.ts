import { GlobalStore } from '@empjs/cli';
import * as webpack from 'webpack';

export type PluginOptions = {
  mode?: 'es' | 'common' | 'raw' | 'base64';
  test?: RegExp;
  resourceQuery?: RegExp;
  type?: ('javascript/auto' | 'javascript/esm' | 'javascript/dynamic' | 'json' | 'asset/resource' | 'asset/inline' | 'asset/source' | 'asset');
  [x: string]: any;
};
export const rawLoaderOptions: PluginOptions = {
  mode: 'raw',
  test: /\.svg$/,
  resourceQuery: /\?raw/,
  type: 'asset/source'
};
const empPluginName = 'emp-raw-plugin';
export function empRawPlugin(options: PluginOptions = {}) {
  const _options = { ...rawLoaderOptions, ...options };
  return {
    name: empPluginName,
    rsConfig(store: GlobalStore) {
      return new Promise<void>((_resolve) => {
        store.chain.module
          .rule(empPluginName)
          .test(_options.test)
          .resourceQuery(_options.resourceQuery)
          .type(_options.type)
          .use(empPluginName)
          .loader(require.resolve('./raw-loader.js'))
          .options({
            ...rawLoaderOptions,
            ..._options,
          })
          .end();
        _resolve(undefined);
      });
    },
  };
}


const webpackPluginName = 'webpack-raw-plugin';
export class webpackRawPlugin {
  _options: PluginOptions;
  constructor(options: PluginOptions = {}) {
    this._options = { ...rawLoaderOptions, ...options };
  }
  name = webpackPluginName
  apply(compiler: webpack.Compiler) {
    compiler.hooks.initialize.tap(webpackPluginName, () => {
      compiler.options.module.rules.push({
        test: this._options.test,
        resourceQuery: this._options.resourceQuery,
        type: this._options.type,
        use: [{
          loader: require.resolve('./raw-loader.js'),
          options: {
            ...rawLoaderOptions,
            ...this._options,
          }
        }],
      });
    });
  }
}