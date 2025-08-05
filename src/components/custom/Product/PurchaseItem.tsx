import {
  CdrUser,
  PurchaseReturn,
  app__modules__cdr__schemas_cdr__ProductComplete,
  patchCdrUsersUserIdPurchasesProductVariantIdValidated,
} from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTranslation } from "@/translations/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiCheck, HiOutlineExclamationCircle, HiXMark } from "react-icons/hi2";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import { LoadingButton } from "../LoadingButton";

interface PurchaseItemProps {
  purchase: PurchaseReturn;
  allProducts: app__modules__cdr__schemas_cdr__ProductComplete[];
  allConstraintIds?: (string | undefined)[];
  allPurchasesIds?: string[];
  userAssociationsMembershipsIds?: string[];
  user: CdrUser;
  isAdmin?: boolean;
}

export const PurchaseItem = ({
  purchase,
  allProducts,
  allConstraintIds,
  allPurchasesIds,
  userAssociationsMembershipsIds,
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
  const isMembershipAlreadyTaken = userAssociationsMembershipsIds?.some(
    (membershipId) =>
      purchase.product.related_membership?.id === membershipId ||
      purchase.product.product_constraints?.some(
        (constraint) => constraint?.related_membership?.id === membershipId,
      ),
  );

  const displayWarning =
    missingConstraintProduct &&
    missingConstraintProduct.length > 0 &&
    notTakenConstraintProduct?.length !== 0 &&
    !isMembershipAlreadyTaken;

  const variant = purchase.product.variants?.find(
    (variant) => variant.id === purchase.product_variant_id,
  );

  return (
    <div>
      <div className="flex flex-row w-full items-center">
        <span className="flex flex-col items-center md:flex-row">
          <span className="font-bold w-7">
            {displayWarning && (
              <HiOutlineExclamationCircle className="inline-block mr-2 h-5 w-5 text-destructive" />
            )}

            {purchase.validated && (
              <HiOutlineCheckBadge className="w-5 h-5 mr-4 text-green-700" />
            )}
          </span>

          <span className="font-bold w-11 pr-3 text-center md:text-right">
            {purchase.quantity} x
          </span>
        </span>

        <div className="flex flex-col md:flex-row w-3/4">
          <span className="font-bold md:w-1/3">{purchase.seller.name}</span>
          <span className="md:w-1/3">
            {selectTranslation(
              purchase.product.name_en,
              purchase.product.name_fr,
            )}
          </span>
          <span className="md:w-1/3">
            {selectTranslation(variant?.name_en, variant?.name_fr)}
          </span>
        </div>
        <span className="ml-auto w-24 text-right font-semibold">
          {((purchase.quantity * purchase.price) / 100).toFixed(2)} €
        </span>
        {isAdmin && (
          <LoadingButton
            size="icon"
            variant="outline"
            className="ml-4 h-8 w-8"
            isLoading={isLoading}
            onClick={() =>
              onValidate(purchase, user, setIsLoading, refetch, toast)
            }
          >
            {purchase.validated ? (
              <HiXMark className="w-5 h-5" />
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

export const onValidate = async (
  purchase: PurchaseReturn,
  user: CdrUser,
  setIsLoading: (loading: boolean) => void,
  refetch: () => void,
  toast: (options: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => void,
) => {
  try {
    setIsLoading(true);
    await patchCdrUsersUserIdPurchasesProductVariantIdValidated({
      path: {
        product_variant_id: purchase.product_variant_id,
        user_id: user.id,
      },
      query: {
        validated: !purchase.validated,
      },
    });
    toast({
      title: purchase.validated ? "Purchase unvalidated" : "Purchase validated",
      variant: "default",
    });
    refetch();
  } catch (error) {
    toast({
      title: "Error",
      description: "There was an error validating the purchase.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
