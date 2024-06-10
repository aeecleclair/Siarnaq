import { ProductVariantComplete } from "@/api";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { VariantCardOptions } from "./VariantCardOptions";
import { VariantCard } from "../VariantCard";

interface VariantCardWithOptionsProps {
  variant: ProductVariantComplete;
  numberSelected: number;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const VariantCardWithOptions = ({
  variant,
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
        canEdit={canEdit}
        canRemove={canRemove}
      />
    </ContextMenu>
  );
};
