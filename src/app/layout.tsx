"use client";

import "./globals.css";
import Provider from "./provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <Provider>{children}</Provider>
          </QueryClientProvider>
        </body>
      </html>
    </Suspense>
  );
}
