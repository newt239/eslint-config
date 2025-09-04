// ESLintエラーを含むTypeScriptコードのサンプル
import express from "express";
import { readFile } from "fs/promises"; // import順序が間違っている

// any型の使用（@typescript-eslint/no-explicit-any ルール）
const badFunction = (data: any): any => {
  console.log(data); // console.logの使用（no-console ルール）
  return data;
};

// 通常の関数宣言（prefer-arrow-functions ルール）
function regularFunction() {
  return "hello";
}

// パラメータが多すぎる（max-params ルール）
const tooManyParams = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): number => {
  return a + b + c + d + e;
};

// 未使用変数（@typescript-eslint/no-unused-vars ルール）
const unusedVariable = "never used";

// 型のインポートが適切でない（@typescript-eslint/consistent-type-imports ルール）
import { Request, Response } from "express";

export { badFunction, regularFunction, tooManyParams };
