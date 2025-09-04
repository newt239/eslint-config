// 正常なTypeScriptコードのサンプル
import { readFile } from "fs/promises";

import express from "express";

import type { Request, Response } from "express";

const app = express();

// アロー関数を使用（prefer-arrow-functions ルール）
const processData = (data: string): string => {
  return data.trim();
};

// 適切な型定義
const handleRequest = (req: Request, res: Response): void => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  res.json({ id, status: "success" });
};

// 最大パラメータ数以下（max-params ルール）
const calculateSum = (a: number, b: number, c: number): number => {
  return a + b + c;
};

// 未使用変数の適切な命名（@typescript-eslint/no-unused-vars ルール）
const unusedFunction = (_unusedParam: string): void => {
  // 実装なし
};

export { processData, handleRequest, calculateSum, unusedFunction };
