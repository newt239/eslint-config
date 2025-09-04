// Next.js App Router用のサンプルファイル
import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Page",
  description: "Test page for ESLint config",
};

// Next.jsのApp Routerではuse clientを使うべきではない
const TestPage = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div>
      <h1>Test Page</h1>
      {children}
    </div>
  );
};

export default TestPage;
