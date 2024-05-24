import { SellerComplete } from "@/api/hyperionSchemas";
import { TabsContent } from "@/components/ui/tabs";

interface SellerTabContentProps {
  seller: SellerComplete;
}

export const SellerTabContent = ({ seller }: SellerTabContentProps) => {
  return (
    <TabsContent value={seller.id}>
      {seller.products ? (
        <>
          {seller.products.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-500">
                {product.available_online
                  ? "Available online"
                  : "Not available online"}
              </p>
            </div>
          ))}
        </>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold">No products found</h3>
        </div>
      )}
    </TabsContent>
  );
};
