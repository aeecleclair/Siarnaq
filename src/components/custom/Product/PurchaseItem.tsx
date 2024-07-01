import {
  app__modules__cdr__schemas_cdr__ProductComplete,
  PurchaseReturn,
} from "@/api";
import { useTranslations } from "next-intl";
import { HiOutlineExclamation } from "react-icons/hi";

interface PurchaseItemProps {
  purchase: PurchaseReturn;
  allProducts?: app__modules__cdr__schemas_cdr__ProductComplete[];
  allConstraintIds?: (string | undefined)[];
  allPurchasesIds?: string[];
}

export const PurchaseItem = ({
  purchase,
  allProducts,
  allConstraintIds,
  allPurchasesIds,
}: PurchaseItemProps) => {
  const t = useTranslations("PurchaseItem");
  const purchaseCompleteProduct = allProducts?.find(
    (product) => product.id === purchase.product.id,
  );
  const missingConstraintProduct =
    purchaseCompleteProduct?.product_constraints?.filter((constraint) =>
      allConstraintIds?.includes(constraint.id),
    );

  const notTakenConstraintProduct = missingConstraintProduct?.filter(
    (product) => !allPurchasesIds?.includes(product.id),
  );

  const displayWarning =
    missingConstraintProduct &&
    missingConstraintProduct.length > 0 &&
    notTakenConstraintProduct?.length !== 0;

  return (
    <div>
      <div className="flex flex-row w-full items-center">
        {displayWarning && (
          <HiOutlineExclamation className="inline-block mr-2 h-5 w-5 text-destructive" />
        )}

        <span className="font-bold w-1/6">{purchase.seller.name}</span>
        <span className="w-1/6">{purchase.product.name_en}</span>
        <span className="w-1/6">
          {
            purchase.product.variants?.find(
              (variant) => variant.id === purchase.product_variant_id,
            )?.name_en
          }
        </span>
        <span className="ml-auto font-semibold">
          {purchase.quantity * purchase.price} €
        </span>
      </div>
      {displayWarning && (
        <div className="mt-1">
          <span className="text-red-500 font-semibold">
            {t("missing", {
              products: missingConstraintProduct
                .map((product) => product.name_en)
                .join(", "),
            })}
          </span>
        </div>
      )}
    </div>
  );
};
