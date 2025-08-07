import { CdrUser } from "@/api";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useUserMemberships } from "@/hooks/useUserMemberships";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LoadingButton } from "../LoadingButton";
import { PurchaseItem, onValidate } from "./PurchaseItem";

interface ProductPartProps {
  user: CdrUser;
  isAdmin?: boolean;
}

export const ProductPart = ({ user, isAdmin }: ProductPartProps) => {
  const pathname = usePathname();
  const t = useTranslations("productPart");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { userMemberships: memberships } = useUserMemberships(user.id);
  const { purchases, total: totalToPay, refetch } = useUserPurchases(user.id);
  const { products: allProducts } = useProducts();

  const allConstraint = allProducts
    .map((product) => product?.product_constraints)
    .flat();
  const allConstraintIds = allConstraint?.map((constraint) => constraint?.id);
  const userAssociationsMembershipsIds = memberships.map(
    (membership) => membership.association_membership_id,
  );

  const handleValidateAll = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        purchases.map((purchase) =>
          onValidate(
            purchase.product_variant_id,
            purchase.validated,
            user.id,
            setIsLoading,
            refetch,
            toast,
          ),
        ),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error validating a purchase.",
        variant: "destructive",
      });
    } finally {
      toast({
        title: purchases
          .map((purchase) => purchase.validated)
          .every((validated) => validated)
          ? "Some Purchase are unvalidated"
          : "All Purchases are validated",
        variant: "default",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-10 -mt-4">
      <div className="grid gap-6 -mt-4">
        <div className="justify-between flex flex-row">
          <CardTitle>{t("summary")}</CardTitle>
          {isAdmin && pathname.startsWith("/admin") ? (
            <LoadingButton onClick={handleValidateAll} isLoading={isLoading}>
              Valider tous les achats
            </LoadingButton>
          ) : null}
        </div>
        <div className="space-y-2">
          {purchases?.filter(
            (purchase) => purchase.product.needs_validation === true,
          )?.length > 0 ? (
            <>
              {purchases
                ?.filter(
                  (purchase) => purchase.product.needs_validation === true,
                )
                .map((purchase) => (
                  <PurchaseItem
                    key={purchase.product_variant_id}
                    allProducts={allProducts}
                    allConstraintIds={allConstraintIds}
                    allPurchasesIds={purchases.map(
                      (purchase) => purchase.product.id,
                    )}
                    purchase={purchase}
                    userAssociationsMembershipsIds={
                      userAssociationsMembershipsIds
                    }
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
      <div className="grid gap-6 -mt-4">
        <div className="justify-between flex flex-row">
          <CardTitle>{t("interestSummary")}</CardTitle>
        </div>
        <div className="space-y-2">
          {purchases?.filter(
            (purchase) => purchase.product.needs_validation === false,
          )?.length > 0 ? (
            <>
              {purchases
                ?.filter(
                  (purchase) => purchase.product.needs_validation === false,
                )
                .map((purchase) => (
                  <PurchaseItem
                    key={purchase.product_variant_id}
                    allProducts={allProducts}
                    allConstraintIds={allConstraintIds}
                    allPurchasesIds={purchases.map(
                      (purchase) => purchase.product.id,
                    )}
                    purchase={purchase}
                    userAssociationsMembershipsIds={
                      userAssociationsMembershipsIds
                    }
                    user={user}
                    isAdmin={isAdmin}
                    isInterest={true}
                  />
                ))}
            </>
          ) : (
            <div>{t("noProduct")}</div>
          )}
        </div>
      </div>
    </div>
  );
};
