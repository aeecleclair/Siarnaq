import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

import Provider from "./provider";
import { QueryProvider } from "./queryProvider";

export const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

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
              <NextIntlClientProvider>
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
