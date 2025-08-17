"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocaleStore } from "@/stores/locale";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Locale, useLocale } from "next-intl";
import Image from "next/image";

export default function LocaleDropdown() {
  const locale = useLocale();
  const { localeStore, setLocaleStore } = useLocaleStore();
  const router = useRouter();
  const pathname = usePathname();

  const localeName = {
    en: "English",
    fr: "Français",
  };

  const onSetLocale = (locale: string) => {
    router.replace({ pathname }, { locale: locale as Locale });
    setLocaleStore(locale as Locale);
  };

  return (
    <div className="p-6 bg-muted/40 w-dvw justify-self-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row p-1">
          <Image
            src={`/${locale}.svg`}
            alt={localeName[locale]}
            width={30}
            height={30}
            className="rounded-2xs border border-border mr-2"
          />
          {localeName[locale]}
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
    </div>
  );
}
