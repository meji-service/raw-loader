import { EMP3PluginType } from '@empjs/cli';

export type PluginOptions = {
  mode?: 'es' | 'common' | 'raw' | 'base64';
  test?: RegExp;
  resourceQuery?: RegExp;
  type?: ('javascript/auto' | 'javascript/esm' | 'javascript/dynamic' | 'json' | 'asset/resource' | 'asset/inline' | 'asset/source' | 'asset');
};
export const rawLoaderOptions: PluginOptions = {
  mode: 'raw',
  test: /\.svg$/,
  resourceQuery: /\?raw/,
  type: 'asset/source'
};
export function rawLoaderPlugin(options: PluginOptions = {}): EMP3PluginType {
  const _options = { ...rawLoaderOptions, ...options };
  return {
    name: 'raw-loader-emp',
    rsConfig(store) {
      return new Promise((_resolve) => {
        store.chain.module
          .rule('raw-loader-emp')
          .test(_options.test)
          .resourceQuery(_options.resourceQuery)
          .type(_options.type)
          .use('raw-loader-emp')
          .loader(require.resolve('./raw-loader.js'))
          .options({
            ...rawLoaderOptions,
            ..._options,
          })
          .end();
        _resolve();
      });
    },
  };
}
