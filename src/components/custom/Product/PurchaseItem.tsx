import { LoadingButton } from "../LoadingButton";
import {
  AvailableAssociationMembership,
  app__modules__cdr__schemas_cdr__ProductComplete,
  PurchaseReturn,
  CdrUser,
  patchCdrUsersUserIdPurchasesProductVariantIdValidated,
} from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTranslation } from "@/translations/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiCheck, HiOutlineExclamation, HiX } from "react-icons/hi";
import { HiOutlineCheckBadge } from "react-icons/hi2";

interface PurchaseItemProps {
  purchase: PurchaseReturn;
  allProducts: app__modules__cdr__schemas_cdr__ProductComplete[];
  allConstraintIds?: (string | undefined)[];
  allPurchasesIds?: string[];
  memberships?: AvailableAssociationMembership[];
  user: CdrUser;
  isAdmin?: boolean;
}

export const PurchaseItem = ({
  purchase,
  allProducts,
  allConstraintIds,
  allPurchasesIds,
  memberships,
  user,
  isAdmin,
}: PurchaseItemProps) => {
  const t = useTranslations("PurchaseItem");
  const { toast } = useToast();
  const { refetch } = useUserPurchases(user.id);
  const { selectTranslation } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const purchaseCompleteProduct = allProducts.find(
    (product) => product.id === purchase.product.id,
  );
  const missingConstraintProduct =
    purchaseCompleteProduct?.product_constraints?.filter((constraint) =>
      allConstraintIds?.includes(constraint.id),
    );
  const notTakenConstraintProduct = missingConstraintProduct?.filter(
    (product) => !allPurchasesIds?.includes(product.id),
  );
  const isMembershipAlreadyTaken = memberships?.some(
    (membership) => membership === purchase.product.related_membership,
  );

  const displayWarning =
    missingConstraintProduct &&
    missingConstraintProduct.length > 0 &&
    notTakenConstraintProduct?.length !== 0 &&
    !isMembershipAlreadyTaken;

  const variant = purchase.product.variants?.find(
    (variant) => variant.id === purchase.product_variant_id,
  );

  async function onValidate() {
    setIsLoading(true);
    const { data, error } =
      await patchCdrUsersUserIdPurchasesProductVariantIdValidated({
        path: {
          product_variant_id: purchase.product_variant_id,
          user_id: user.id,
        },
        query: {
          validated: !purchase.validated,
        },
      });
    if (error) {
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    refetch();
  }

  return (
    <div>
      <div className="flex flex-row w-full items-center">
        {displayWarning && (
          <HiOutlineExclamation className="inline-block mr-2 h-5 w-5 text-destructive" />
        )}

        {purchase.validated && (
          <HiOutlineCheckBadge className="w-5 h-5 mr-4 text-green-700" />
        )}

        <span className="font-bold w-1/6">{purchase.seller.name}</span>
        <span className="w-1/6">
          {selectTranslation(
            purchase.product.name_en,
            purchase.product.name_fr,
          )}
        </span>
        <span className="w-1/6">
          {selectTranslation(variant?.name_en, variant?.name_fr)}
        </span>
        <span className="ml-auto font-semibold">
          {((purchase.quantity * purchase.price) / 100).toFixed(2)} €
        </span>
        {isAdmin && (
          <LoadingButton
            size="icon"
            variant="outline"
            className="ml-4 h-8 w-8"
            isLoading={isLoading}
            onClick={onValidate}
          >
            {purchase.validated ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiCheck className="w-5 h-5" />
            )}
          </LoadingButton>
        )}
      </div>
      {displayWarning && (
        <div className="mt-1">
          <span className="text-red-500 font-semibold">
            {t("missing", {
              products: missingConstraintProduct
                .map((product) =>
                  selectTranslation(product.name_en, product.name_fr),
                )
                .join(", "),
            })}
          </span>
        </div>
      )}
    </div>
  );
};
