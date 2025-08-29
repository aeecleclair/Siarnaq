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
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocaleStore } from "@/stores/locale";
import { useTokenStore } from "@/stores/token";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { Locale, useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function TopBar() {
  const t = useTranslations("topbar");
  const { setToken, setRefreshToken } = useTokenStore();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin } = useCoreUser();
  const { sellers } = useSellers();

  const isInASellerGroup = user?.groups?.some((group) =>
    sellers.some((seller) => seller.group_id === group.id),
  );

  return (
    <div className="p-6 bg-muted/40 flex flex-row gap-x-4">
      <LocaleDropdown />
      {["/", "/admin"].includes(pathname) && (
        <Button
          onClick={() => {
            setRefreshToken(null);
            setToken(null);
          }}
        >
          {t("logout")}
        </Button>
      )}
      {pathname === "/" && (isAdmin || isInASellerGroup) && (
        <Button onClick={() => router.push("/admin")}>{t("admin")}</Button>
      )}
      {pathname === "/admin" && (
        <Button onClick={() => router.push("/")}>{t("user")}</Button>
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
          className="rounded-2xs border border-border mr-2"
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
