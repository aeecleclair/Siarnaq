import {
  ProductVariantComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import { VariantCard } from "../VariantCard";
import { VariantCardOptions } from "./VariantCardOptions";

interface VariantCardWithOptionsProps {
  variant: ProductVariantComplete;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  sellerId: string;
  userId: string;
  showDescription: boolean;
  refreshProduct: () => void;
  isSelectable: boolean;
  isAdmin: boolean;
  displayWarning?: boolean;
}

export const VariantCardWithOptions = ({
  variant,
  canEdit,
  canRemove,
  canDisable,
  product,
  sellerId,
  userId,
  showDescription,
  refreshProduct,
  isSelectable,
  isAdmin,
  displayWarning,
}: VariantCardWithOptionsProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <VariantCard
          variant={variant}
          sellerId={sellerId}
          userId={userId}
          showDescription={showDescription}
          isSelectable={isSelectable}
          isAdmin={isAdmin}
          displayWarning={displayWarning}
          productId={product.id}
        />
      </ContextMenuTrigger>
      <VariantCardOptions
        variant={variant}
        canEdit={canEdit}
        canRemove={canRemove}
        canDisable={canDisable}
        sellerId={sellerId}
        productId={product.id}
        refreshProduct={refreshProduct}
      />
    </ContextMenu>
  );
};
