import { products } from "@/components/user/products";
import { sellers } from "@/components/user/sellers";
import { useVariantQuantityStore } from "@/stores/variantQuantityStore";

interface SellerItemProps {
  id: string;
}

export const SellerItem = ({ id }: SellerItemProps) => {
  const { variantQuantity } = useVariantQuantityStore();
  const sellerProducts = variantQuantity[id];
  const productIds = Object.keys(sellerProducts.products) as Array<string>;
  return productIds.map((productId) => {
    const variants = sellerProducts.products[productId];
    const variantIds = Object.keys(variants) as Array<string>;
    return variantIds.map((variantId) => {
      const product = products.find((product) => product.id === productId);
      const variant = product?.variants?.find(
        (variant) => variant.id === variantId,
      );
      if (variants[variantId] === 0) return null;
      const variantPrice = variants[variantId] * (variant?.price ?? 0);
      return (
        <div className="flex flex-row w-full" key={variantId}>
          <span className="font-bold w-1/6">
            {sellers.find((seller) => seller.id === id)?.name}
          </span>
          <span className="w-1/6">{product?.name_en}</span>
          <span className="w-1/6">{variant?.name_en}</span>
          <span className="ml-auto font-semibold">{variantPrice} €</span>
        </div>
      );
    });
  });
};
