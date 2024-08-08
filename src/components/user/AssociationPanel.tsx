import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
} from "react-icons/hi";

export const AssociationPanel = () => {
  const t = useTranslations("AssociationPanel");
  const { onlineSellers } = useOnlineSellers();
  const { userId } = useTokenStore();
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers.at(0)?.id;
  const { purchases } = useUserPurchases(userId);
  const totalPurchases =
    purchases?.reduce<number>((acc, purchase) => acc + purchase.quantity, 0) ??
    0;

  return (
    <div>
      <div className="mx-auto grid w-full max-w-6xl gap-2 mb-6">
        <h1 className="text-3xl font-semibold">{t("associations")}</h1>
      </div>
      <nav className="grid gap-4 text-sm text-muted-foreground">
        <Link
          href="/?sellerId=intro"
          className={`hover:text-primary ${
            firstSellerId === "intro" ? "font-semibold text-primary" : ""
          }`}
        >
          <div className="flex flex-row items-center">
            <HiOutlineSparkles className="h-4 w-4 mr-2" />
            {t("presentation")}
          </div>
        </Link>
        {onlineSellers.map((seller) => {
          const purchasesCount =
            purchases.filter((purchase) => purchase.seller.id === seller.id)
              .length ?? 0;
          return (
            <Link
              key={seller.id}
              href={`/?sellerId=${seller.id}`}
              className={`hover:text-primary ${
                seller.id === firstSellerId ? "font-semibold text-primary" : ""
              }`}
            >
              <div className="flex flex-row items-center">
                {purchasesCount > 0 ? (
                  <HiOutlineShoppingCart className="h-4 w-4 mr-2" />
                ) : (
                  <div className="w-4 mr-2"></div>
                )}
                {seller.name}
                {purchasesCount > 0 && (
                  <>
                    <span className="ml-2">·</span>
                    <span className="ml-2">{purchasesCount}</span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
        <Link
          href="/?sellerId=recap"
          className={`hover:text-primary ${
            firstSellerId === "recap" ? "font-semibold text-primary" : ""
          }`}
        >
          <div className="flex flex-row items-center">
            <HiOutlineClipboardList className="h-4 w-4 mr-2" />
            {t("summary")}
            {totalPurchases > 0 && (
              <>
                <span className="ml-2">·</span>
                <span className="ml-2">{totalPurchases}</span>
              </>
            )}
          </div>
        </Link>
      </nav>
    </div>
  );
};
