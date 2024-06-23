import { CoreUser } from "@/api";
import { CardTitle } from "@/components/ui/card";
import { useUserPurchases } from "@/hooks/useUserPurchase";
import { Separator } from "@radix-ui/react-context-menu";

interface ProductPartProps {
  user: CoreUser;
}

export const ProductPart = ({ user }: ProductPartProps) => {
  const { purchases } = useUserPurchases(user.id);
  const totalToPay = 100;
  return (
    <div className="grid gap-6">
      <div>
        <CardTitle>Récapitulatif</CardTitle>
      </div>
      <div className="space-y-2">
        {purchases && purchases?.length > 0 ? (
          <>
            {purchases.map((purchase) => (
              <div key={purchase.product_variant_id}>
                <span>
                  {purchase.product_variant_id} - {purchase.quantity}
                </span>
              </div>
              //   <SellerItem key={purchase.product_variant_id} id={id} />
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
