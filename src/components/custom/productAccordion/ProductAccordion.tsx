import { app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";
import { Badge } from "@/components/ui/badge";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useUser } from "@/hooks/useUser";
import { useUserMemberships } from "@/hooks/useUserMemberships";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useSizeStore } from "@/stores/SizeStore";
import { useTranslation } from "@/translations/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { AddingVariantCard } from "./AddingVariantCard";
import { ProductAccordionOptions } from "./ProductAccordionOptions";
import { VariantCardWithOptions } from "./VariantCardWithOptions";

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
  const purchasedVariantIds = userPurchases.map(
    (purchase) => purchase.product_variant_id,
  );
  const { user } = useUser(userId);
  const { memberships } = useUserMemberships(userId);
  const variantToDisplay = isAdmin
    ? product.variants
    : product.variants
        ?.filter(
          (variant) =>
            variant.enabled || purchasedVariantIds.includes(variant.id),
        )
        .filter((variant) =>
          variant.allowed_curriculum
            ?.map((curriculum) => curriculum.id)
            ?.includes(user?.curriculum?.id ?? ""),
        );
  const purchasedProductIds = userPurchases.map(
    (purchase) => purchase.product.id,
  );
  const missingConstraintProducts = product.product_constraints?.filter(
    (constraint) => !purchasedProductIds.includes(constraint.id),
  );
  const isMissingConstraint =
    missingConstraintProducts && missingConstraintProducts?.length > 0;
  const isOneVariantTaken = product.variants?.some((variant) =>
    purchasedVariantIds.includes(variant.id),
  );

  const takenMembership = memberships?.find((membership) =>
    product.related_membership?.includes(membership.membership),
  );

  const isMembershipAlreadyTaken = takenMembership !== undefined;

  const isConstraintMembershipTaken = memberships?.some((membership) =>
    product.product_constraints?.some((constraint) =>
      constraint?.related_membership?.includes(membership.membership),
    ),
  );

  const displayWarning =
    isMissingConstraint &&
    isOneVariantTaken &&
    !isMembershipAlreadyTaken &&
    !isConstraintMembershipTaken;

  return (
    (isAdmin || (variantToDisplay?.length ?? 0) > 0) && (
      <AccordionItem value={product.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-2">
                {product.related_membership && isMembershipAlreadyTaken && (
                  <div className="w-20">
                    <HiOutlineCheckBadge className="w-5 h-5 mr-4 text-green-700" />
                  </div>
                )}
                <div className="flex flex-col items-start justify-between">
                  <h3 className="text-lg font-semibold flex flex-row">
                    {selectTranslation(product.name_en, product.name_fr)}
                    {product.available_online && (
                      <Badge variant="outline" className="mx-2">
                        <span className="font-normal text-xs">online</span>
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectTranslation(
                      product.description_en,
                      product.description_fr,
                    )}
                  </p>
                </div>
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
        Can't find a better way to do it for now */}
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
          {product.related_membership && isMembershipAlreadyTaken && (
            <p className="text-green-700 my-2 font-semibold">
              {t("membershipAlreadyTaken", {
                membership: takenMembership?.membership ?? "",
                date: format(
                  new Date(takenMembership?.end_date),
                  "dd/MM/yyyy",
                  { locale: fr },
                ),
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
                      (((variant.allowed_curriculum
                        ?.map((curriculum) => curriculum.id)
                        .includes(user?.curriculum?.id ?? "") ||
                        false) &&
                        !isMembershipAlreadyTaken) ||
                        purchasedVariantIds.includes(variant.id))
                    }
                    isAdmin={isAdmin}
                    displayWarning={
                      displayWarning ||
                      (!variant.enabled &&
                        purchasedVariantIds.includes(variant.id))
                    }
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
