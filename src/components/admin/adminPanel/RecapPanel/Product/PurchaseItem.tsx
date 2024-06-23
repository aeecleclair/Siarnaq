import { PurchaseReturn } from "@/api";
interface PurchaseItemProps {
  purchase: PurchaseReturn;
}

export const PurchaseItem = ({ purchase }: PurchaseItemProps) => {
  return (
    <div className="flex flex-row w-full">
      <span className="font-bold w-1/6">{purchase.seller.name}</span>
      <span className="w-1/6">{purchase.product.name_en}</span>
      <span className="w-1/6">
        {
          purchase.product.variants?.find(
            (variant) => variant.id === purchase.product_variant_id,
          )?.name_en
        }
      </span>
      <span className="ml-auto font-semibold">
        {purchase.quantity * purchase.price} €
      </span>
    </div>
  );
};
