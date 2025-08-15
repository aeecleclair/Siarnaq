"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";
import { useLocaleStore } from "@/stores/locale";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function LocaleDropdown() {
  const locale = useLocale();
  const { localeStore, setLocaleStore } = useLocaleStore();

  const localeName = {
    en: "English",
    fr: "Français",
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {routing.locales.map((l) => (
            <DropdownMenuItem key={l}>
              <Image
                src={`/${l}.svg`}
                alt={localeName[l]}
                width={30}
                height={30}
                className="rounded-2xs border border-border mr-2"
              />
              <span>{localeName[l]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
