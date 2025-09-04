import { describe, it, expect } from "vitest";
import { ESLint } from "eslint";
import createConfig from "../src/index.js";

describe("ESLint Text Linting Tests", () => {
  describe("JavaScript Rules", () => {
    it("no-console ルールがJavaScriptファイルで機能することを確認", async () => {
      const config = createConfig();
      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      });

      const code = `
function test() {
  console.log('This should error');
  console.warn('This should be allowed');
  console.error('This should be allowed');
}
`;

      const results = await eslint.lintText(code, { filePath: "test.js" });
      const consoleErrors = results[0]?.messages.filter(
        (m) => m.ruleId === "no-console"
      );

      expect(consoleErrors.length).toBe(1);
      expect(consoleErrors[0].message).toContain(
        "Unexpected console statement"
      );
    });

    it("max-params ルールがJavaScriptファイルで機能することを確認", async () => {
      const config = createConfig();
      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      });

      const code = `
function tooManyParams(a, b, c, d, e) {
  return a + b + c + d + e;
}

function okParams(a, b, c) {
  return a + b + c;
}
`;

      const results = await eslint.lintText(code, { filePath: "test.js" });
      const paramErrors = results[0]?.messages.filter(
        (m) => m.ruleId === "max-params"
      );

      expect(paramErrors.length).toBe(1);
      expect(paramErrors[0].message).toContain("too many parameters");
    });

    it("prefer-arrow-functions ルールがJavaScriptファイルで機能することを確認", async () => {
      const config = createConfig();
      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      });

      const code = `
function regularFunction() {
  return 'should be arrow function';
}

const arrowFunction = () => {
  return 'this is fine';
};
`;

      const results = await eslint.lintText(code, { filePath: "test.js" });
      const arrowErrors = results[0]?.messages.filter(
        (m) => m.ruleId === "prefer-arrow-functions/prefer-arrow-functions"
      );

      expect(arrowErrors.length).toBeGreaterThan(0);
      expect(arrowErrors[0].message).toContain("arrow function");
    });
  });

  describe("Configuration Structure Validation", () => {
    it("設定が有効なESLint設定として認識されることを確認", async () => {
      const config = createConfig();
      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      });

      // 簡単なコードでESLintが正常に動作することを確認
      const code = 'const test = "hello world";';
      const results = await eslint.lintText(code, { filePath: "test.js" });

      expect(results).toHaveLength(1);
      expect(results[0].filePath).toContain("test.js");
      expect(typeof results[0].errorCount).toBe("number");
      expect(typeof results[0].warningCount).toBe("number");
    });

    it("TypeScriptファイルでパーサーが正しく動作することを確認", async () => {
      const config = createConfig();

      // TypeScript設定を見つける
      const tsConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx}"))
      );

      expect(tsConfig?.languageOptions?.parser).toBeDefined();
      expect(tsConfig?.plugins?.["@typescript-eslint"]).toBeDefined();
    });

    it("プラグインのルールが設定に含まれていることを確認", () => {
      const config = createConfig();

      const commonConfig = config.find((c) =>
        c.files?.some((pattern) => pattern.includes("**/*.{ts,tsx,js,jsx}"))
      );

      // importプラグインのルールが含まれていることを確認
      const importRules = Object.keys(commonConfig?.rules || {}).filter(
        (rule) => rule.startsWith("import/")
      );
      expect(importRules.length).toBeGreaterThan(0);
      expect(importRules).toContain("import/order");
    });
  });

  describe("Error Handling", () => {
    it("基本的なオプションでエラーが発生しないことを確認", () => {
      expect(() => createConfig({})).not.toThrow();
      expect(() => createConfig({ next: false })).not.toThrow();

      // Next.jsオプションは依存関係がない場合エラーになる可能性があるため、エラーハンドリングをテスト
      try {
        createConfig({ next: true });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("next/core-web-vitals");
      }
    });

    it("設定が空でないことを確認", () => {
      const config = createConfig();

      expect(config.length).toBeGreaterThan(0);
      expect(config.every((c) => typeof c === "object")).toBe(true);
    });
  });
});
