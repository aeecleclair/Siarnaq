import { defineRouting } from "next-intl/routing";

const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
});
