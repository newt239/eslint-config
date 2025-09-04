# newt-eslint-config

[![NPM Version](https://img.shields.io/npm/v/newt-eslint-config)](https://www.npmjs.com/package/newt-eslint-config)
![GitHub License](https://img.shields.io/github/license/newt239/eslint-config)

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

```ts
import createConfig from "newt-eslint-config";

export default createConfig({ next: true });
```

## Rule List

### [no-console](https://eslint.org/docs/latest/rules/no-console)

Disallow the use of `console` methods.

### [max-params](https://eslint.org/docs/latest/rules/max-params)

Limit the number of parameters of a function to 3.

### [prefer-arrow-functions](https://eslint.org/docs/latest/rules/prefer-arrow-functions)

Enforce arrow functions for function expressions.

### [import/order](https://eslint.org/docs/latest/rules/import/order)

Enforce consistent import order.

### [max-lines](https://eslint.org/docs/latest/rules/max-lines)

Limit the number of lines of a file to 300.

### [no-restricted-syntax](https://eslint.org/docs/latest/rules/no-restricted-syntax)

Limit the use of restricted syntax.

### [no-explicit-any](https://eslint.org/docs/latest/rules/no-explicit-any)

Disallow the use of `any` type.

### [no-unsafe-type-assertion](https://eslint.org/docs/latest/rules/no-unsafe-type-assertion)

Disallow the use of unsafe type assertions.

### [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)

Disallow the use of unused variables.

### [strict-boolean-expressions](https://eslint.org/docs/latest/rules/strict-boolean-expressions)

Disallow the use of strict boolean expressions.

### [consistent-type-imports](https://eslint.org/docs/latest/rules/consistent-type-imports)

Disallow the use of inconsistent type imports.

### [switch-exhaustiveness-check](https://eslint.org/docs/latest/rules/switch-exhaustiveness-check)

Disallow the use of switch exhaustiveness check.

### [prefer-arrow-functions](https://eslint.org/docs/latest/rules/prefer-arrow-functions)

Enforce arrow functions for function expressions.

### [prefer-arrow-functions](https://eslint.org/docs/latest/rules/prefer-arrow-functions)

Enforce arrow functions for function expressions.
