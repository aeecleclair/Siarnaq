"use client";

import { SellerComplete, app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";
import { TabsContent } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { AddProductAccordionItem } from "./AddProductAccordionItem";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useEffect, useState } from "react";
import { getCdrSellersSellerIdProducts } from "@/api";

interface SellerTabContentProps {
  seller: SellerComplete;
  setRefetchSellers: (arg0:boolean)=>void
}

export const SellerTabContent = ({ seller, setRefetchSellers }: SellerTabContentProps) => {
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const [products, setProducts] = useState<app__modules__cdr__schemas_cdr__ProductComplete[]>([]);

  const onGetCdrSellerProducts = async () => {
    const { data, error } = await getCdrSellersSellerIdProducts({path:{seller_id:seller.id}});
    if (error) {
      console.log(error);
      return;
    }
    setProducts(data!);
  };

  useEffect(()=>{
    onGetCdrSellerProducts()
  }, [seller])

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
      <AddProductAccordionItem seller={seller} setRefetchSellers={setRefetchSellers} />
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
