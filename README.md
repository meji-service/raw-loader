```ts
// emp-config.ts

import { rawLoaderPlugin } from 'raw-loader-emp';

export default {
    // ...其他配置信息...
    plugins: [
        rawLoaderPlugin(),
    ],
};

```

```ts
declare const rawLoaderOptions: {
    mode?: 'es' | 'common' | 'raw' | 'base64';
    test?: RegExp;
    resourceQuery?: RegExp;
};
rawLoaderPlugin(options?: rawLoaderOptions);
```