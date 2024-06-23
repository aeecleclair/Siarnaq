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
import { useSizeStore } from "@/stores/SizeStore";

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
  const variantToDisplay = showDisabled
    ? product.variants
    : product.variants?.filter((variant) => variant.enabled);

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
          canEdit
          canRemove={product.variants?.length === 0}
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
                  productId={product.id}
                  sellerId={sellerId}
                  canEdit={canEdit}
                  canRemove={canRemove}
                  canDisable={canDisable}
                  showDescription={showDescription}
                  refreshProduct={refreshProduct}
                  isSelectable={isSelectable}
                  isAdmin={isAdmin}
                />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
