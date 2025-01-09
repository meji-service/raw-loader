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

```ts
// webpack.config.js
import {  webpackRawPlugin } from 'raw-loader-plugin';

export default {
    // ...其他配置信息...
    plugins: [
       new webpackRawPlugin(),
    ],
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