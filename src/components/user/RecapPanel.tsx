import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { PaymentButton } from "./PaymentButton";
import {
  app__modules__cdr__schemas_cdr__ProductComplete,
  getCdrOnlineProducts,
} from "@/api";
import { useState, useEffect } from "react";

export const RecapPanel = () => {
  const { onlineSellers } = useOnlineSellers();
  // const { variantQuantity } = useVariantQuantityStore();
  // const sellerIds = Object.keys(variantQuantity) as Array<string>;
  var total = 0;

  const [onlineProducts, setOnlineProducts] = useState<
    app__modules__cdr__schemas_cdr__ProductComplete[]
  >([]);
  const [refetchOnlineProducts, setRefetchOnlineProducts] =
    useState<boolean>(true);

  useEffect(() => {
    const onGetCdrOnlineProducts = async () => {
      const { data, error } = await getCdrOnlineProducts({});
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
  }, [refetchOnlineProducts]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* {sellerIds.length > 0 ? (
          <>
            {sellerIds.map((id) => {
              const sellerProducts = variantQuantity[id];
              const productIds = Object.keys(
                sellerProducts.products,
              ) as Array<string>;
              return productIds.map((productId) => {
                const variants = sellerProducts.products[productId];
                const variantIds = Object.keys(variants) as Array<string>;
                return variantIds.map((variantId) => {
                  const product = onlineProducts.find(
                    (product) => product.id === productId,
                  );
                  const variant = product?.variants?.find(
                    (variant) => variant.id === variantId,
                  );
                  if (variants[variantId] === 0) return null;
                  const variantPrice =
                    variants[variantId] * (variant?.price ?? 0);
                  total += variantPrice;
                  return (
                    <div className="flex flex-row w-full" key={variantId}>
                      <span className="font-bold w-1/6">
                        {onlineSellers.find((seller) => seller.id === id)?.name}
                      </span>
                      <span className="w-1/6">{product?.name_en}</span>
                      <span className="w-1/6">{variant?.name_en}</span>
                      <span className="ml-auto font-semibold">
                        {variantPrice} €
                      </span>
                    </div>
                  );
                });
              });
            })}
            <Separator className="my-2" />
            <div className="flex flex-row w-full">
              <span className="font-bold w-1/6">Total</span>
              <span className="ml-auto font-semibold">{total} €</span>
            </div>
          </>
        ) : (
          <div>Aucun produit</div>
        )} */}
      </CardContent>
      <CardFooter className="px-6 py-4">
        <PaymentButton />
      </CardFooter>
    </Card>
  );
};
