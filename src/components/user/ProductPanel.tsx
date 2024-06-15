import { ProductAccordion } from "../custom/productAccordion/ProductAccordion";
import { Accordion } from "../ui/accordion";
import {
  SellerComplete,
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
import { useToken } from "@/hooks/useToken";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductPanel = ({
  onlineSellers,
}: {
  onlineSellers: SellerComplete[];
}) => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";
  const seller = onlineSellers.find((seller) => seller.id === firstSellerId);
  const sellerIndex = onlineSellers.findIndex(
    (seller) => seller.id === firstSellerId,
  );
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const router = useRouter();

  const [onlineProducts, setOnlineProducts] = useState<
    app__modules__cdr__schemas_cdr__ProductComplete[]
  >([]);
  const [refetchOnlineProducts, setRefetchOnlineProducts] =
    useState<boolean>(true);

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

    if (refetchOnlineProducts) {
      onGetCdrOnlineProducts();
      setRefetchOnlineProducts(false);
    }
  }, [refetchOnlineProducts, firstSellerId]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      productExpansion[firstSellerId] !== undefined
    ) {
      setExpandedProducts(
        firstSellerId,
        onlineProducts.map((product) => product.id),
      );
    }
  }, [productExpansion, firstSellerId, setExpandedProducts, onlineProducts]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{seller ? seller.name : "No seller found"}</CardTitle>
        </CardHeader>
        <CardContent>
          {onlineProducts ? (
            <Accordion
              type="multiple"
              value={productExpansion[firstSellerId]}
              onValueChange={(value) =>
                setExpandedProducts(firstSellerId, value)
              }
            >
              {onlineProducts.map((product) => (
                <ProductAccordion
                  key={product.id}
                  product={product}
                  sellerId={seller?.id || ""}
                  showDescription
                  isSelectable
                  refreshProduct={() => {}}
                />
              ))}
            </Accordion>
          ) : (
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">No products found</h3>
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 py-4">
          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                router.replace(
                  `/?sellerId=${onlineSellers[sellerIndex - 1]?.id || ""}`,
                )
              }
              disabled={sellerIndex === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground w-14 flex justify-center">
              {sellerIndex + 1} / {onlineSellers.length}
            </span>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                router.replace(
                  `/?sellerId=${onlineSellers[sellerIndex + 1]?.id || ""}`,
                )
              }
              disabled={sellerIndex === onlineSellers.length - 1}
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
