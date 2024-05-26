"use client";

import { SellerComplete } from "@/api/hyperionSchemas";
import { TabsContent } from "@/components/ui/tabs";
import { products } from "./sellers";
import { Accordion } from "@/components/ui/accordion";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { AddProductAccordionItem } from "./AddProductAccordionItem";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useEffect } from "react";

interface SellerTabContentProps {
  seller: SellerComplete;
}

export const SellerTabContent = ({ seller }: SellerTabContentProps) => {
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !productExpansion[seller.id]?.products &&
      productExpansion[seller.id]?.loaded
    ) {
      setExpandedProducts(
        seller.id,
        products.map((product) => product.id)
      );
    }
  }, [productExpansion, seller.id, setExpandedProducts]);

  return (
    <TabsContent value={seller.id} className="min-w-96">
      <AddProductAccordionItem seller={seller} />
      {products ? (
        <Accordion
          type="multiple"
          value={productExpansion[seller.id]?.products}
          onValueChange={(value) => setExpandedProducts(seller.id, value)}
        >
          {products.map((product) => (
            <ProductAccordion
              key={product.id}
              product={product}
              canAdd
              canEdit
              canRemove
            />
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
