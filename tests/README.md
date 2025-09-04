# ESLint Config Tests

このディレクトリには、ESLint 設定の動作を検証するためのテストが含まれています。

## テストの実行

```bash
# 全てのテストを実行
npm test

# ウォッチモードでテストを実行
npm run test:watch

# UIでテストを実行
npm run test:ui
```

## テストの構成

### `eslint-config.test.ts`

- ESLint 設定の構造テスト
- 基本的な設定項目の存在確認
- Next.js オプションの動作確認

### `lint-text.test.ts`

- 実際の ESLint ルールの動作テスト
- JavaScript コードに対するルール適用の確認
- 設定の有効性検証

### `fixtures/`

- テスト用のサンプルファイル
- 正常なコードと問題のあるコードの例

## テスト対象のルール

- `@typescript-eslint/no-explicit-any`: any 型の使用禁止
- `no-console`: console.log 等の制限
- `max-params`: 最大パラメータ数の制限
- `prefer-arrow-functions/prefer-arrow-functions`: アロー関数の推奨
- `import/order`: インポート文の順序
- `@typescript-eslint/consistent-type-imports`: 型インポートの一貫性
