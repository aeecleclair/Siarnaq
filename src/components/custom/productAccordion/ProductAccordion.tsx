import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { AddingVariantCard } from "./AddingVariantCard";
import { ProductAccordionOptions } from "./ProductAccordionOptions";
import { VariantCardWithOptions } from "./VariantCardWithOptions";
import { app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useUser } from "@/hooks/useUser";
import { useUserMemberships } from "@/hooks/useUserMemberships";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useSizeStore } from "@/stores/SizeStore";
import { useTranslation } from "@/translations/utils";
import { useTranslations } from "next-intl";

interface ProductAccordionProps {
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  canAdd?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  sellerId: string;
  userId: string;
  showDescription?: boolean;
  refreshProduct: () => void;
  isSelectable?: boolean;
  isAdmin?: boolean;
}

export const ProductAccordion = ({
  product,
  canAdd,
  canEdit,
  canRemove,
  canDisable,
  sellerId,
  userId,
  showDescription = false,
  refreshProduct,
  isSelectable = false,
  isAdmin = false,
}: ProductAccordionProps) => {
  const t = useTranslations("ProductAccordion");
  const { selectTranslation } = useTranslation();
  const { size } = useSizeStore();
  const numberOfCard = Math.round(size / 20);
  const { purchases: userPurchases } = useUserPurchases(userId);
  const { user } = useUser(userId);
  const { memberships } = useUserMemberships(userId);
  const variantToDisplay = isAdmin
    ? product.variants
    : product.variants
        ?.filter((variant) => variant.enabled)
        .filter((variant) =>
          variant.allowed_curriculum
            ?.map((curriculum) => curriculum.id)
            ?.includes(user?.curriculum?.id ?? ""),
        );
  const purchasedProductIds = userPurchases?.map(
    (purchase) => purchase.product.id,
  );
  const purchasedVariantIds = userPurchases?.map(
    (purchase) => purchase.product_variant_id,
  );
  const missingConstraintProducts = product.product_constraints?.filter(
    (constraint) => !purchasedProductIds?.includes(constraint.id),
  );
  const isMissingConstraint =
    missingConstraintProducts && missingConstraintProducts?.length > 0;
  const isOneVariantTaken = product.variants?.some((variant) =>
    purchasedVariantIds?.includes(variant.id),
  );
  const isMembershipAlreadyTaken = memberships?.some(
    (membership) => membership.membership === product.related_membership,
  );

  const displayWarning =
    isMissingConstraint && isOneVariantTaken && !isMembershipAlreadyTaken;

  return (
    (isAdmin || (variantToDisplay?.length ?? 0) > 0) && (
      <AccordionItem value={product.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <AccordionTrigger>
              <div className="flex flex-col items-start justify-between">
                <h3 className="text-lg font-semibold">
                  {selectTranslation(product.name_en, product.name_fr)}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectTranslation(
                    product.description_en,
                    product.description_fr,
                  )}
                </p>
              </div>
            </AccordionTrigger>
          </ContextMenuTrigger>
          <ProductAccordionOptions
            product={product}
            sellerId={sellerId}
            refreshProduct={refreshProduct}
            canEdit={canEdit}
            canRemove={product.variants?.length === 0 && canRemove}
          />
        </ContextMenu>
        <AccordionContent>
          {/* Take care to export all grid-cols-n
        Can't find a better way to do it for naw */}
          <div className="hidden grid-cols-5" />
          <div className="hidden grid-cols-4" />
          <div className="hidden grid-cols-3" />
          <div className="hidden grid-cols-2" />
          <div className="hidden grid-cols-1" />
          {displayWarning && (
            <p className="text-red-500 font-semibold mb-2">
              {t("mustBuy", {
                products:
                  missingConstraintProducts
                    ?.map((product) =>
                      selectTranslation(product.name_en, product.name_fr),
                    )
                    .join(", ") ?? "",
              })}
            </p>
          )}
          <div
            className={`grid ${showDescription ? "grid-row" : "grid-cols-" + numberOfCard} gap-4`}
          >
            {variantToDisplay && (
              <>
                {canAdd && (
                  <AddingVariantCard
                    sellerId={sellerId}
                    productId={product.id}
                    refreshProduct={refreshProduct}
                  />
                )}
                {variantToDisplay.map((variant) => (
                  <VariantCardWithOptions
                    key={variant.id}
                    variant={variant}
                    product={product}
                    sellerId={sellerId}
                    userId={userId}
                    canEdit={canEdit}
                    canRemove={canRemove}
                    canDisable={canDisable}
                    showDescription={showDescription}
                    refreshProduct={refreshProduct}
                    isSelectable={
                      isSelectable &&
                      (variant.allowed_curriculum
                        ?.map((curriculum) => curriculum.id)
                        .includes(user?.curriculum?.id ?? "") ||
                        false)
                    }
                    isAdmin={isAdmin}
                    displayWarning={displayWarning}
                  />
                ))}
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    )
  );
};
