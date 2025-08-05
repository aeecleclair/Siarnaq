import { CdrUser } from "@/api";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/hooks/useProducts";
import { useUserMemberships } from "@/hooks/useUserMemberships";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTranslations } from "next-intl";

import { PurchaseItem } from "./PurchaseItem";

interface ProductPartProps {
  user: CdrUser;
  isAdmin?: boolean;
}

export const ProductPart = ({ user, isAdmin }: ProductPartProps) => {
  const t = useTranslations("productPart");
  const { userMemberships } = useUserMemberships(user.id);
  const { purchases, total: totalToPay } = useUserPurchases(user.id);
  const { products: allProducts } = useProducts();
  const allConstraint = allProducts
    .map((product) => product?.product_constraints)
    .flat();
  const allConstraintIds = allConstraint?.map((constraint) => constraint?.id);
  const userAssociationsMembershipsIds = userMemberships.map(
    (membership) => membership.association_membership_id,
  );
  return (
    <div className="grid gap-6 -mt-4">
      <div>
        <CardTitle>{t("summary")}</CardTitle>
      </div>
      <div className="space-y-2">
        {purchases?.length > 0 ? (
          <>
            {purchases.map((purchase) => (
              <PurchaseItem
                key={purchase.product_variant_id}
                allProducts={allProducts}
                allConstraintIds={allConstraintIds}
                allPurchasesIds={purchases.map(
                  (purchase) => purchase.product.id,
                )}
                purchase={purchase}
                userAssociationsMembershipsIds={userAssociationsMembershipsIds}
                user={user}
                isAdmin={isAdmin}
              />
            ))}
            <Separator className="my-2" />
            <div className="flex flex-row w-full">
              <span className="font-bold w-1/6">{t("total")}</span>
              <span className="ml-auto font-semibold">
                {totalToPay?.toFixed(2)} €
              </span>
            </div>
          </>
        ) : (
          <div>{t("noProduct")}</div>
        )}
      </div>
    </div>
  );
};
