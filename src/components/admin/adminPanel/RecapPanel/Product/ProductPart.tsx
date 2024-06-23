import { PurchaseItem } from "./PurchaseItem";
import { CoreUser } from "@/api";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/components/user/products";
import { useProducts } from "@/hooks/useProducts";
import { useUserPurchases } from "@/hooks/useUserPurchase";

interface ProductPartProps {
  user: CoreUser;
}

export const ProductPart = ({ user }: ProductPartProps) => {
  const { purchases, total: totalToPay } = useUserPurchases(user.id);
  const { products: allProducts } = useProducts();
  const allConstraint = allProducts
    ?.map((product) => product?.product_constraints)
    .flat();
  const allConstraintIds = allConstraint?.map((constraint) => constraint?.id);
  return (
    <div className="grid gap-6">
      <div>
        <CardTitle>Récapitulatif</CardTitle>
      </div>
      <div className="space-y-2">
        {purchases && purchases?.length > 0 ? (
          <>
            {purchases.map((purchase) => (
              <PurchaseItem
                key={purchase.product_variant_id}
                allProducts={allProducts}
                allConstraintIds={allConstraintIds}
                allPurchasesIds={purchases.map((purchase) => purchase.product.id)}
                purchase={purchase}
              />
            ))}
            <Separator className="my-2" />
            <div className="flex flex-row w-full">
              <span className="font-bold w-1/6">Total</span>
              <span className="ml-auto font-semibold">{totalToPay} €</span>
            </div>
          </>
        ) : (
          <div>Aucun produit</div>
        )}
      </div>
    </div>
  );
};
