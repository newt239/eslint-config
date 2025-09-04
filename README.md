# newt-eslint-config

newt239's ESLint config.

## Usage

```bash
npm install -D newt-eslint-config
```

```ts
import createConfig from "newt-eslint-config";

export default createConfig();
```

If you want to add other rules, you can add them to the config.

```ts
import createConfig from "newt-eslint-config";

const baseConfigs = createConfig();
const configs = [
  ...baseConfigs,
  {
    rules: {
      "no-console": "error",
    },
  },
];

export default configs;
```

### Next.js

You must install `@next/eslint-plugin-next` as a dev dependency.

```bash
npm install -D @next/eslint-plugin-next
```

```js
import createConfig from "newt-eslint-config";

export default createConfig({ next: true });
```
