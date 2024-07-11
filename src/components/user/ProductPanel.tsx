import { ProductAccordion } from "../custom/productAccordion/ProductAccordion";
import { Accordion } from "../ui/accordion";
import {
  app__modules__cdr__schemas_cdr__ProductComplete,
  getCdrOnlineSellersSellerIdProducts,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { useUser } from "@/hooks/useUser";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useTokenStore } from "@/stores/token";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductPanel = () => {
  const t = useTranslations("ProductPanel");
  const { onlineSellers } = useOnlineSellers();
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";
  const seller = onlineSellers?.find((seller) => seller.id === firstSellerId);
  const sellerIndex = onlineSellers?.findIndex(
    (seller) => seller.id === firstSellerId,
  );
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const router = useRouter();
  const { userId } = useTokenStore();
  const { user } = useUser(userId);

  const [onlineProducts, setOnlineProducts] = useState<
    app__modules__cdr__schemas_cdr__ProductComplete[]
  >([]);

  useEffect(() => {
    const onGetCdrOnlineProducts = async () => {
      const { data, error } = await getCdrOnlineSellersSellerIdProducts({
        path: {
          seller_id: firstSellerId,
        },
      });
      if (error) {
        console.log(error);
        return;
      }
      setOnlineProducts(data!);
    };
    if (firstSellerId !== "") onGetCdrOnlineProducts();
  }, [firstSellerId, onlineSellers]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      productExpansion[firstSellerId] === undefined &&
      seller?.id === firstSellerId &&
      onlineProducts
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

  const availableProducts = onlineProducts?.filter(
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
          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (!onlineSellers || sellerIndex === undefined) {
                  return;
                }
                router.replace(
                  `/?sellerId=${onlineSellers[sellerIndex - 1]?.id || ""}`,
                );
              }}
              disabled={sellerIndex === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {onlineSellers && sellerIndex !== undefined && (
              <span className="text-sm font-medium text-muted-foreground w-14 flex justify-center">
                {sellerIndex + 1} / {onlineSellers.length}
              </span>
            )}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (!onlineSellers || sellerIndex === undefined) {
                  return;
                }
                router.replace(
                  `/?sellerId=${onlineSellers[sellerIndex + 1]?.id || ""}`,
                );
              }}
              disabled={sellerIndex === (onlineSellers?.length ?? 0) - 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
