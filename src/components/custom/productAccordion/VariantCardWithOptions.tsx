import { VariantCard } from "../VariantCard";
import { VariantCardOptions } from "./VariantCardOptions";
import {
  ProductVariantComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

interface VariantCardWithOptionsProps {
  variant: ProductVariantComplete;
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  setRefetchSellers: (arg0: boolean) => void;
  numberSelected: number;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const VariantCardWithOptions = ({
  variant,
  product,
  setRefetchSellers,
  numberSelected,
  canEdit,
  canRemove,
}: VariantCardWithOptionsProps) => {
  const selected = numberSelected > 0;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <VariantCard
          variant={variant}
          numberSelected={numberSelected}
          selected={selected}
        />
      </ContextMenuTrigger>
      <VariantCardOptions
        variant={variant}
        product={product}
        setRefetchSellers={setRefetchSellers}
        canEdit={canEdit}
        canRemove={canRemove}
      />
    </ContextMenu>
  );
};
