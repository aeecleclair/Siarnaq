"use client";

import { AddProductAccordionItem } from "./AddProductAccordionItem";
import {
  SellerComplete,
  Status,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";
import { getCdrSellersSellerIdProducts } from "@/api";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { Accordion } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SellerTabContentProps {
  status: Status;
  seller: SellerComplete;
  products?: app__modules__cdr__schemas_cdr__ProductComplete[];
  refetchProducts: () => void;
}

export const SellerTabContent = ({
  status,
  seller,
  products,
  refetchProducts,
}: SellerTabContentProps) => {
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      productExpansion[seller.id] === undefined &&
      seller.id === activeSellerId &&
      products
    ) {
      setExpandedProducts(
        seller.id,
        products.map((product) => product.id),
      );
    }
  }, [
    productExpansion,
    seller.id,
    setExpandedProducts,
    products,
    activeSellerId,
  ]);

  return (
    <TabsContent value={seller.id} className="min-w-96">
      <AddProductAccordionItem
        seller={seller}
        refreshProduct={refetchProducts}
      />
      {products ? (
        <Accordion
          type="multiple"
          value={productExpansion[seller.id]}
          onValueChange={(value) => setExpandedProducts(seller.id, value)}
        >
          {products.map((product) => (
            <ProductAccordion
              key={product.id}
              product={product}
              sellerId={seller.id}
              canAdd={status.status !== "closed"}
              canEdit={status.status === "pending"}
              canRemove={status.status === "pending"}
              canDisable={status.status !== "closed"}
              showDisabled
              refreshProduct={refetchProducts}
              isSelectable={status.status === "onsite"}
              isAdmin
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
