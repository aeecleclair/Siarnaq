import { ProductVariantComplete } from "@/api/hyperionSchemas";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { HiMinus, HiPlus } from "react-icons/hi";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { VariantCardOptions } from "./VariantCardOptions";

interface VariantCardProps {
  variant: ProductVariantComplete;
  numberSelected: number;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const VariantCard = ({
  variant,
  numberSelected,
  canEdit,
  canRemove,
}: VariantCardProps) => {
  const selected = numberSelected > 0;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={`min-w-40 ${selected && "border-black shadow-lg"} ${!variant.enabled && "text-muted-foreground"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
            <CardTitle className="text-sm font-medium">
              <span>{variant.name_en}</span>
            </CardTitle>
            {!variant.unique && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-6 px-1"
                  disabled={!selected || !variant.enabled}
                >
                  <HiMinus className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {numberSelected}
                </span>
                <Button
                  variant="outline"
                  className="h-6 px-1"
                  disabled={!variant.enabled}
                >
                  <HiPlus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              <span>{variant.price} €</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {variant.description_en}
            </p>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <VariantCardOptions
        variant={variant}
        canEdit={canEdit}
        canRemove={canRemove}
      />
    </ContextMenu>
  );
};
