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
import { useUserPurchases } from "@/hooks/useUserPurchase";
import { useSizeStore } from "@/stores/SizeStore";
import { useSearchParams } from "next/navigation";

interface ProductAccordionProps {
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  canAdd?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  sellerId: string;
  showDescription?: boolean;
  showDisabled?: boolean;
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
  showDescription = false,
  showDisabled = false,
  refreshProduct,
  isSelectable = false,
  isAdmin = false,
}: ProductAccordionProps) => {
  const { size } = useSizeStore();
  const numberOfCard = Math.round(size / 20);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { purchases: userPurchases } = useUserPurchases(userId ?? "");
  const variantToDisplay = showDisabled
    ? product.variants
    : product.variants?.filter((variant) => variant.enabled);
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

  const displayWarning = isMissingConstraint && isOneVariantTaken;

  return (
    <AccordionItem value={product.id}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AccordionTrigger>
            <div className="flex flex-col items-start justify-between">
              <h3 className="text-lg font-semibold">{product.name_en}</h3>
              <p className="text-sm text-gray-500">{product.description_en}</p>
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
          <p className="text-red-500 font-semibold mb-2">{`Vous devez acheter ${
            missingConstraintProducts
              ?.map((product) => product.name_en)
              .join(", ") ?? ""
          }`}</p>
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
                  canEdit={canEdit}
                  canRemove={canRemove}
                  canDisable={canDisable}
                  showDescription={showDescription}
                  refreshProduct={refreshProduct}
                  isSelectable={isSelectable}
                  isAdmin={isAdmin}
                  displayWarning={displayWarning}
                />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
