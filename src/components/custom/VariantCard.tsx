import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductVariantComplete } from "@/api/types.gen";
import { useVariantQuantityStore } from "@/stores/variantQuantityStore";
import { HiMinus, HiPlus } from "react-icons/hi";

interface VariantCardProps {
  variant: ProductVariantComplete;
  sellerId: string;
  productId: string;
  showDescription: boolean;
  isSelectable: boolean;
}

export const VariantCard = ({
  variant,
  sellerId,
  productId,
  showDescription,
  isSelectable,
}: VariantCardProps) => {
  const { variantQuantity, setVariantQuantity } = useVariantQuantityStore();
  const numberSelectedVariant =
    variantQuantity[sellerId]?.products[productId]?.[variant.id] || 0;
  const selected = numberSelectedVariant > 0;
  return (
    <Card
      className={`min-w-40 ${selected && "border-black shadow-lg"} ${!variant.enabled && "text-muted-foreground"}`}
      onClick={() => {
        if (isSelectable && variant.enabled && variant.unique) {
          setVariantQuantity(
            sellerId,
            productId,
            variant.id,
            1 - numberSelectedVariant,
          );
        }
      }}
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
              onClick={(e) => {
                if (!isSelectable) return;
                e.stopPropagation();
                setVariantQuantity(
                  sellerId,
                  productId,
                  variant.id,
                  numberSelectedVariant - 1,
                );
              }}
            >
              <HiMinus className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-3 justify-center flex">
              {numberSelectedVariant}
            </span>
            <Button
              variant="outline"
              className="h-6 px-1"
              disabled={!variant.enabled}
              onClick={(e) => {
                if (!isSelectable) return;
                e.stopPropagation();
                setVariantQuantity(
                  sellerId,
                  productId,
                  variant.id,
                  numberSelectedVariant + 1,
                );
              }}
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
        {showDescription && (
          <p className="text-xs text-muted-foreground">
            {variant.description_en}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
