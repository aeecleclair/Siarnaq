import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnlineSellerProducts } from "@/hooks/useOnlineSellerProducts";
import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { useUser } from "@/hooks/useUser";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PageIndicator } from "../custom/PageIndicator";
import { ProductAccordion } from "../custom/productAccordion/ProductAccordion";
import { Accordion } from "../ui/accordion";

export const ProductPanel = () => {
  const t = useTranslations("ProductPanel");
  const { onlineSellers } = useOnlineSellers();
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";
  const { onlineProducts } = useOnlineSellerProducts(firstSellerId);
  const seller = onlineSellers?.find((seller) => seller.id === firstSellerId);

  const { productExpansion, setExpandedProducts } = useProductExpansionStore();

  const { userId } = useTokenStore();
  const { user } = useUser(userId);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      productExpansion[firstSellerId] === undefined &&
      seller?.id === firstSellerId &&
      onlineProducts &&
      onlineProducts.length > 0
    ) {
      setExpandedProducts(
        firstSellerId,
        onlineProducts.map((product) => product.id),
      );
    }
  }, [
    productExpansion,
    firstSellerId,
    setExpandedProducts,
    onlineProducts,
    seller?.id,
  ]);

  const availableProducts = onlineProducts.filter(
    (product) =>
      product?.variants?.filter(
        (variant) =>
          variant.allowed_curriculum?.filter(
            (curriculum) => curriculum.id === user?.curriculum?.id,
          )?.length ?? 0 > 0,
      )?.length ?? 0 > 0,
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{seller ? seller.name : "No seller found"}</CardTitle>
        </CardHeader>
        <CardContent>
          {availableProducts.length > 0 ? (
            <Accordion
              type="multiple"
              value={productExpansion[firstSellerId]}
              onValueChange={(value) =>
                setExpandedProducts(firstSellerId, value)
              }
            >
              {availableProducts.map((product) => (
                <ProductAccordion
                  key={product.id}
                  product={product}
                  sellerId={seller?.id || ""}
                  userId={userId!}
                  showDescription
                  isSelectable
                  refreshProduct={() => {}}
                />
              ))}
            </Accordion>
          ) : (
            <h3 className="text-lg font-semibold">{t("noProductFound")}</h3>
          )}
        </CardContent>
        <CardFooter className="px-6 py-4">
          <PageIndicator
            currentSellerId={firstSellerId}
            onlineSellers={onlineSellers}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
