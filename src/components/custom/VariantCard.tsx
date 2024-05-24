import { ProductVariantComplete } from "@/api/hyperionSchemas";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface VariantCardProps {
  variant: ProductVariantComplete;
  selected: boolean;
}

export const VariantCard = ({ variant, selected }: VariantCardProps) => {
  return (
    <Card className={`min-w-40 ${selected && "border-black shadow-lg"}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
        <CardTitle className="text-sm font-medium">
          <span>{variant.name_en}</span>
        </CardTitle>
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
  );
};
