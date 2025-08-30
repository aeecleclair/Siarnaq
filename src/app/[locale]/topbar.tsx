"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCoreUser } from "@/hooks/useCoreUser";
import { useSellers } from "@/hooks/useSellers";
import { useStatus } from "@/hooks/useStatus";
import { useYear } from "@/hooks/useYear";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocaleStore } from "@/stores/locale";
import { useTokenStore } from "@/stores/token";
import { CaretSortIcon, ExitIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Locale, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { HiOutlineLibrary } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi2";

export default function TopBar() {
  const t = useTranslations("topbar");
  const { setToken, setRefreshToken } = useTokenStore();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin } = useCoreUser();
  const { sellers } = useSellers();
  const { year } = useYear();
  const { status } = useStatus();

  const isInASellerGroup = user?.groups?.some((group) =>
    sellers.some((seller) => seller.group_id === group.id),
  );

  return (
    <div className="p-6 bg-muted/40 flex flex-row flex-nowrap gap-x-4">
      <LocaleDropdown />
      <ThemeToggle />
      {["/", "/admin"].includes(pathname) && (
        <Button
          variant="secondary"
          onClick={() => {
            setRefreshToken(null);
            setToken(null);
          }}
        >
          <ExitIcon className="mr-2" />
          {t("logout")}
        </Button>
      )}
      {pathname === "/" && (isAdmin || isInASellerGroup) && (
        <Button variant="secondary" onClick={() => router.push("/admin")}>
          <HiOutlineLibrary className="mr-2" />
          {t("admin")}
        </Button>
      )}
      {pathname === "/admin" && (
        <Button variant="secondary" onClick={() => router.push("/")}>
          <HiShoppingCart className="mr-2" />
          {t("user")}
        </Button>
      )}
      {pathname === "/admin" && (
        <div className="flex flex-col text-sm text-nowrap">
          <span>{t("year", { year: year.toString() })}</span>
          {status?.status && (
            <span>{t("status", { status: status?.status })}</span>
          )}
        </div>
      )}
    </div>
  );
}

function LocaleDropdown() {
  const locale = useLocale();
  const { localeStore, setLocaleStore } = useLocaleStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("sellerId") ?? "";
  if (!localeStore) setLocaleStore(locale);

  const localeName = {
    en: "English",
    fr: "Français",
  };

  const onSetLocale = (l: string) => {
    if (l !== locale) {
      router.push({ pathname, query: { sellerId } }, { locale: l as Locale });
      setLocaleStore(l as Locale);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row p-1">
        <Image
          src={`/${locale}.svg`}
          alt={localeName[locale]}
          width={30}
          height={30}
          className="rounded-2xs mr-2"
        />
        <span className="self-center">{localeName[locale]}</span>
        <CaretSortIcon className="ml-2 size-6 self-center" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={onSetLocale}>
          {routing.locales.map((l) => (
            <DropdownMenuRadioItem key={l} value={l}>
              <Image
                src={`/${l}.svg`}
                alt={localeName[l]}
                width={30}
                height={30}
                className="rounded-2xs border border-border mr-2"
              />
              <span>{localeName[l]}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function toggleNames(theme: string) {
  return theme === "light" ? "dark" : "light";
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(toggleNames(resolvedTheme!))}
      className="inline-flex items-center justify-center text-foreground"
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
