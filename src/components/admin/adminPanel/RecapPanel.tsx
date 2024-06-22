import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentButton } from "@/components/user/PaymentButton";
import { products } from "@/components/user/products";
import { sellers } from "@/components/user/sellers";
import { useVariantQuantityStore } from "@/stores/variantQuantityStore";

export const RecapPanel = () => {
  const { variantQuantity } = useVariantQuantityStore();
  const sellerIds = Object.keys(variantQuantity) as Array<string>;
  var total = 0;
  return (
    <div className="grid gap-6 pt-8">
      <div>
        <CardTitle>Récapitulatif</CardTitle>
      </div>
      <div className="space-y-2">
        {sellerIds.length > 0 ? (
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
                  const product = products.find(
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
                        {sellers.find((seller) => seller.id === id)?.name}
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
        )}
      </div>
    </div>
  );
};
