
### @emp/cli
```ts
// emp-config.ts

import { empRawPlugin } from 'raw-loader-plugin';

export default {
    // ...其他配置信息...
    plugins: [
        empRawPlugin(),
    ],
};

```

### webpack
- 第一张方法
```ts
// webpack.config.js
import { webpackRawPlugin } from 'raw-loader-plugin';

export default {
    // ...其他配置信息...
    plugins: [
       new webpackRawPlugin(),
    ],
};
```

- 第二种方法
```ts
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset/source',
        resourceQuery: /\?raw/,
        use: [
          {
            loader: require.resolve('raw-loader-plugin/dist/raw-loader.js'),
            options: {
              mode: 'raw',
            },
          },
        ],
      },
    ],
  },
};
```

```ts
declare const rawLoaderOptions: {
    mode?: 'es' | 'common' | 'raw' | 'base64';
    test?: RegExp;
    resourceQuery?: RegExp;
};
empRawPlugin(options?: rawLoaderOptions);
```