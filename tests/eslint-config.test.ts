import { describe, it, expect } from "vitest";
import createConfig from "../src/index.js";

describe("ESLint Config Tests", () => {
  describe("Configuration Structure", () => {
    it("基本設定が正しい配列構造を持つことを確認", () => {
      const config = createConfig();

      expect(Array.isArray(config)).toBe(true);
      expect(config.length).toBeGreaterThan(0);
    });

    it("ignores設定が含まれることを確認", () => {
      const config = createConfig();
      const ignoreConfig = config.find((c) => c.ignores);

      expect(ignoreConfig).toBeDefined();
      expect(ignoreConfig?.ignores).toContain("node_modules/**");
      expect(ignoreConfig?.ignores).toContain(".next/**");
      expect(ignoreConfig?.ignores).toContain("build/**");
      expect(ignoreConfig?.ignores).toContain("out/**");
    });

    it("TypeScript用の設定が含まれることを確認", () => {
      const config = createConfig();

      const tsConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx}"))
      );

      expect(tsConfig).toBeDefined();
      expect(tsConfig?.plugins).toBeDefined();
      expect(tsConfig?.plugins?.["@typescript-eslint"]).toBeDefined();
    });

    it("共通JavaScript/TypeScript設定が含まれることを確認", () => {
      const config = createConfig();

      const commonConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx,js,jsx}"))
      );

      expect(commonConfig).toBeDefined();
      expect(commonConfig?.plugins?.import).toBeDefined();
      expect(commonConfig?.plugins?.["prefer-arrow-functions"]).toBeDefined();
    });
  });

  describe("Rule Configuration", () => {
    it("重要なTypeScriptルールが設定されることを確認", () => {
      const config = createConfig();

      const tsConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx}"))
      );

      expect(tsConfig?.rules?.["@typescript-eslint/no-explicit-any"]).toBe(
        "error"
      );
      expect(
        tsConfig?.rules?.["@typescript-eslint/no-unused-vars"]
      ).toBeDefined();
      expect(
        tsConfig?.rules?.["@typescript-eslint/consistent-type-imports"]
      ).toBeDefined();
      expect(
        tsConfig?.rules?.["@typescript-eslint/switch-exhaustiveness-check"]
      ).toBe("error");
    });

    it("共通ルールが設定されることを確認", () => {
      const config = createConfig();

      const commonConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx,js,jsx}"))
      );

      expect(commonConfig?.rules?.["no-console"]).toEqual([
        "error",
        { allow: ["warn", "error"] },
      ]);
      expect(commonConfig?.rules?.["max-params"]).toEqual([
        "error",
        { max: 3 },
      ]);
      expect(commonConfig?.rules?.["import/order"]).toBeDefined();
      expect(
        commonConfig?.rules?.["prefer-arrow-functions/prefer-arrow-functions"]
      ).toBeDefined();
      expect(commonConfig?.rules?.["max-lines"]).toBeDefined();
    });

    it("import/orderルールが正しく設定されることを確認", () => {
      const config = createConfig();

      const commonConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx,js,jsx}"))
      );

      const importOrderRule = commonConfig?.rules?.["import/order"] as any[];
      expect(importOrderRule).toBeDefined();
      expect(importOrderRule[0]).toBe("error");

      const orderConfig = importOrderRule[1];
      expect(orderConfig.groups).toContain("builtin");
      expect(orderConfig.groups).toContain("external");
      expect(orderConfig.alphabetize.order).toBe("asc");
    });
  });

  describe("Next.js Configuration", () => {
    it("Next.jsオプションなしでは基本設定のみが含まれることを確認", () => {
      const config = createConfig({ next: false });

      // 基本的な設定数を確認（ignores + recommended + common + ts + prettier）
      expect(config.length).toBe(5);
    });

    it("Next.jsオプション有効時に設定が追加されることを確認（エラーハンドリング付き）", () => {
      const basicConfig = createConfig({ next: false });

      try {
        const nextConfig = createConfig({ next: true });
        // Next.js設定が追加される場合
        expect(nextConfig.length).toBeGreaterThan(basicConfig.length);

        // Next.js用のファイルパターンルールが含まれることを確認
        const nextSpecificRule = nextConfig.find((c) =>
          c.files?.some((pattern) => pattern.includes("src/app/**/page.tsx"))
        );
        expect(nextSpecificRule).toBeDefined();
      } catch (error) {
        // Next.jsプラグインがない場合のエラーハンドリング
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("next/core-web-vitals");
      }
    });
  });

  describe("Plugin Configuration", () => {
    it("必要なプラグインが設定されることを確認", () => {
      const config = createConfig();

      // プラグインが設定されている設定項目を探す
      const configsWithPlugins = config.filter((c) => c.plugins);
      expect(configsWithPlugins.length).toBeGreaterThan(0);

      // 共通プラグインの確認
      const commonConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx,js,jsx}"))
      );
      expect(commonConfig?.plugins?.import).toBeDefined();
      expect(commonConfig?.plugins?.["prefer-arrow-functions"]).toBeDefined();

      // TypeScriptプラグインの確認
      const tsConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx}"))
      );
      expect(tsConfig?.plugins?.["@typescript-eslint"]).toBeDefined();
    });
  });
});
