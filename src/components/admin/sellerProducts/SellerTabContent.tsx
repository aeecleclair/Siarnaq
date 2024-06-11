"use client";

import { AddProductAccordionItem } from "./AddProductAccordionItem";
import {
  SellerComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";
import { getCdrSellersSellerIdProducts } from "@/api";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { Accordion } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SellerTabContentProps {
  seller: SellerComplete;
  setRefetchSellers: (arg0: boolean) => void;
}

export const SellerTabContent = ({
  seller,
  setRefetchSellers,
}: SellerTabContentProps) => {
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const [products, setProducts] = useState<
    app__modules__cdr__schemas_cdr__ProductComplete[]
  >([]);
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");

  useEffect(() => {
    const onGetCdrSellerProducts = async () => {
      const { data, error } = await getCdrSellersSellerIdProducts({
        path: { seller_id: seller.id },
      });
      if (error) {
        console.log(error);
        return;
      }
      setProducts(data!);
    };
    if (seller.id == activeSellerId) onGetCdrSellerProducts();
  }, [seller.id, activeSellerId]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !productExpansion[seller.id]?.products &&
      productExpansion[seller.id]?.loaded
    ) {
      setExpandedProducts(
        seller.id,
        products.map((product) => product.id),
      );
    }
  }, [productExpansion, seller.id, setExpandedProducts, products]);

  return (
    <TabsContent value={seller.id} className="min-w-96">
      <AddProductAccordionItem
        seller={seller}
        setRefetchSellers={setRefetchSellers}
      />
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
              setRefetchSellers={setRefetchSellers}
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
