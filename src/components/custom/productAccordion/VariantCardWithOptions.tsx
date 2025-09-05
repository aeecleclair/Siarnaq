import { VariantCard } from "../VariantCard";
import { VariantCardOptions } from "./VariantCardOptions";

import {
  ProductVariantComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

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
  isInterestProduct?: boolean;
  isMembershipProduct?: boolean;
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
  isInterestProduct = false,
  isMembershipProduct = false,
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
          isInterestProduct={isInterestProduct}
        />
      </ContextMenuTrigger>
      <VariantCardOptions
        variant={variant}
        canEdit={canEdit}
        canRemove={canRemove}
        canDisable={canDisable}
        sellerId={sellerId}
        productId={product.id}
        userId={userId}
        refreshProduct={refreshProduct}
        isInterestProduct={isInterestProduct}
        isMembershipProduct={isMembershipProduct}
      />
    </ContextMenu>
  );
};
