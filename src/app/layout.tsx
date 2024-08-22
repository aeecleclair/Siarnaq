import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";
import Provider from "./provider";
import { QueryProvider } from "./queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chaîne de rentrée",
  description:
    "Plateforme de gestion de la rentrée associative de Centrale Lyon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <Suspense>
      <html lang={locale}>
        <Script
          defer
          data-domain="rentree.myecl.fr"
          src="https://plausible.eclair.ec-lyon.fr/js/script.js"
          strategy="lazyOnload"
        />

        <body className={inter.className}>
          <QueryProvider>
            <Provider>
              <NextIntlClientProvider messages={messages}>
                {children}
                <Toaster />
              </NextIntlClientProvider>
            </Provider>
          </QueryProvider>
        </body>
      </html>
    </Suspense>
  );
}
