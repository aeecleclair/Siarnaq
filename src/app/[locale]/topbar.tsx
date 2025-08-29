"use client";

import LocaleDropdown from "@/components/custom/locale-dropdown";
import { Button } from "@/components/ui/button";
import { useCoreUser } from "@/hooks/useCoreUser";
import { useSellers } from "@/hooks/useSellers";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";

export default function TopBar() {
  const t = useTranslations("topbar");
  const { setToken, setRefreshToken } = useTokenStore();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin } = useCoreUser();
  const { sellers } = useSellers();

  console.log(pathname);
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
      {pathname === "/" &&
        (isAdmin ||
          user?.groups?.some((group) =>
            sellers.some((seller) => seller.group_id === group.id),
          )) && (
          <Button onClick={() => router.push("/admin")}>{t("admin")}</Button>
        )}
      {pathname === "/admin" && (
        <Button onClick={() => router.push("/")}>{t("user")}</Button>
      )}
    </div>
  );
}
