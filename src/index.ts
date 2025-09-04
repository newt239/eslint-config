import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";

export type Options = {
  next?: boolean;
};

const createConfig = ({ next = false }: Options = {}): Linter.Config[] => {
  const compat = new FlatCompat({ baseDirectory: process.cwd() });

  const ignoresBase = ["node_modules/**", "out/**", "build/**"];
  const ignoresNext = [".next/**", "next-env.d.ts"];
  const ignores = next ? [...ignoresBase, ...ignoresNext] : ignoresBase;

  const config = defineConfig([
    { ignores },

    js.configs.recommended,

    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        import: importPlugin,
      },
      rules: {
        ...importPlugin.configs.recommended.rules,
        "no-console": ["error", { allow: ["warn", "error"] }],
        "max-params": ["error", { max: 3 }],
        "func-style": "error",
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            pathGroups: [
              {
                pattern: "{react,react-dom/**,react-router-dom,next,next/**}",
                group: "builtin",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: { order: "asc" },
            "newlines-between": "always",
          },
        ],
        "max-lines": [
          "error",
          { max: 300, skipBlankLines: false, skipComments: false },
        ],
      },
    },

    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: process.cwd(),
          project: ["./tsconfig.json"],
        },
      },
      plugins: {
        "@typescript-eslint": tseslint.plugin,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unsafe-type-assertion": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/strict-boolean-expressions": [
          "warn",
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            fixStyle: "separate-type-imports",
            disallowTypeAnnotations: false,
          },
        ],
        "@typescript-eslint/switch-exhaustiveness-check": "error",
      },
    },
  ]);

  if (next) {
    config.push(...compat.extends("next/core-web-vitals", "next/typescript"), {
      files: [
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "src/app/**/loading.tsx",
        "src/app/**/error.tsx",
        "src/app/**/not-found.tsx",
      ],
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector: "Program > ExpressionStatement[directive='use client']",
            message:
              "App Router の page.tsx や layout.tsx では 'use client' を使用しないでください。",
          },
        ],
      },
    });
  }

  config.push(eslintConfigPrettier);

  return config;
};

export default createConfig;
