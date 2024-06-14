import { VariantCard } from "../VariantCard";
import { VariantCardOptions } from "./VariantCardOptions";
import { ProductVariantComplete } from "@/api";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

interface VariantCardWithOptionsProps {
  variant: ProductVariantComplete;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  productId: string;
  sellerId: string;
  showDescription: boolean;
  refreshProduct: () => void;
  isSelectable: boolean;
}

export const VariantCardWithOptions = ({
  variant,
  canEdit,
  canRemove,
  canDisable,
  productId,
  sellerId,
  showDescription,
  refreshProduct,
  isSelectable,
}: VariantCardWithOptionsProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <VariantCard
          variant={variant}
          productId={productId}
          sellerId={sellerId}
          showDescription={showDescription}
          isSelectable={isSelectable}
        />
      </ContextMenuTrigger>
      <VariantCardOptions
        variant={variant}
        canEdit={canEdit}
        canRemove={canRemove}
        canDisable={canDisable}
        sellerId={sellerId}
        productId={productId}
        refreshProduct={refreshProduct}
      />
    </ContextMenu>
  );
};
