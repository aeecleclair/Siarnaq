import { SellerComplete } from "@/api/hyperionSchemas";
import { TabsContent } from "@/components/ui/tabs";
import { products } from "./sellers";
import { Accordion } from "@/components/ui/accordion";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";

interface SellerTabContentProps {
  seller: SellerComplete;
}

export const SellerTabContent = ({ seller }: SellerTabContentProps) => {
  return (
    <TabsContent value={seller.id} className="min-w-96">
      {products ? (
        <Accordion type="multiple">
          {products.map((product) => (
            <ProductAccordion key={product.id} product={product} canAdd canEdit canRemove/>
          ))}
        </Accordion>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold">No products found</h3>
        </div>
      )}
    </TabsContent>
  );
};
