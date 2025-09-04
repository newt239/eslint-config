"use client"; // App Routerのpage.tsxでは使用すべきでない

import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invalid Test Page",
  description: "Test page with use client directive",
};

const InvalidTestPage = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <div>
      <h1>Invalid Test Page</h1>
      {children}
    </div>
  );
};

export default InvalidTestPage;
